const express = require('express')
const jwt = require('jsonwebtoken')
const { default: mongoose } = require('mongoose')

const app = express()
const router = express.Router()
const bcrypt = require('bcrypt')
const cookieParser = require('cookie-parser')
const User = require('./models/User')
const Quiz = require('./models/Quiz')
const { authenticateJWT } = require('./middleware/authMiddleware')
const quizRouter = require('./routes/quiz')

require('dotenv').config()

app.use(express.json())
app.use(cookieParser())
app.use('/loggedInOnly', authenticateJWT)
app.use('/loggedInOnly/quiz', quizRouter)

async function validatePassword (plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword)
}

mongoose.connect('mongodb://127.0.0.1/newtestdb', { useUnifiedTopology: true, useNewUrlParser: true })

const { connection } = mongoose

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

app.use('/', router)
app.listen(3000, () => console.log('listening on 3000'))

// User login api
app.post('/login', async (req, res, next) => {
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
    return null
  } catch (error) {
    next(error)
    return null
  }
})

app.post('/register', async (req, res, next) => {
  try {
    const { userName, password } = req.body
    const newUser = new User({ userName, password })
    await newUser.save()

    res.json(newUser)
  } catch (error) {
    next(error)
  }
})

app.get('/loggedInOnly/myQuizes', async (req, res) => {
  const userId = res.locals.user._id
  await Quiz.find({ createdBy: userId }).lean().exec((err, quizes) => {
    if (err) { res.send(err) }
    res.json(quizes)
  })
})

app.get('/loggedInOnly/quizes/:quizId', async (req, res) => {
  await Quiz.find({ _id: req.params.quizId }).lean().exec((err, quiz) => {
    if (err) { res.send(err) }
    res.json(quiz)
  })
})
