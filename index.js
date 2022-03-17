const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const { authenticateJWT } = require('./middleware/authMiddleware')
const quizRouter = require('./routes/quiz')
const accountRouter = require('./routes/account')
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
app.use('/account', accountRouter)
app.use('/loggedInOnly', authenticateJWT)
app.use('/loggedInOnly/quiz', quizRouter)

mongoose.connect('mongodb://127.0.0.1/newtestdb', { useUnifiedTopology: true, useNewUrlParser: true })

const { connection } = mongoose

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

app.listen(3000, () => console.log('listening on 3000'))
