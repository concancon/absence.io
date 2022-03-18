const express = require('express')
const { default: mongoose } = require('mongoose')
const app = express()
const cookieParser = require('cookie-parser')
const { authenticateJWT } = require('./middleware/authMiddleware')
const quizRouter = require('./routes/quizRoute')
const accountRouter = require('./routes/accountRoute')
const playRouter = require('./routes/playRoute')
require('dotenv').config()
app.use(express.json())
app.use(cookieParser())
app.use('/account', accountRouter)
app.use('/loggedInOnly/account', authenticateJWT, accountRouter)
app.use('/loggedInOnly', authenticateJWT)
app.use('/loggedInOnly/quiz', quizRouter)
app.use('/loggedInOnly/play', playRouter)
const https = require('https')
const fs = require('fs')

mongoose.connect('mongodb://127.0.0.1/newtestdb', { useUnifiedTopology: true, useNewUrlParser: true })

const { connection } = mongoose

connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

https
  .createServer(
    // Provide the private and public key to the server by reading each
    // file's content with the readFileSync() method.
    {
      key: fs.readFileSync('./key.pem'),
      cert: fs.readFileSync('./cert.pem')
    },
    app
  )
  .listen(3000, () => {
    console.log('serever is runing at port 3000')
  })
