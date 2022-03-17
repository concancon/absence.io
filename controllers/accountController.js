const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

async function validatePassword (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

exports.account_create_user = async (req, res, next) => {
  try {
    const { userName, password } = req.body
    const newUser = new User({ userName, password })
    await newUser.save()

    res.json(newUser)
  } catch (error) {
    next(error)
  }
}

exports.account_login = async (req, res, next) => {
  try {
    const { userName, password } = req.body

    const user = await User.findOne({ userName })

    if (!user) return next(new Error('Username does not exist'))
    const validPassword = await validatePassword(password, user.password)
    if (!validPassword) return next(new Error('Password is not correct'))
    const accessToken = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: '1d'
    })
    res.cookie('token', accessToken, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }) // should set secure to true for this scheme to work
    res.status(200).json({
      data: { userName: user.userName }
    })
  } catch (error) {
    next(error)
  }
}

exports.account_logout = async (req, res, next) => {
  try {
    res.cookie('token', '', { maxAge: 1 })
    res.send('you are now logged out')
  } catch (error) {
    next(error)
  }
}
