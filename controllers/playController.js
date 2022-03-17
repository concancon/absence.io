const Play = require('../models/play')
const Quiz = require('../models/Quiz')

exports.play_get = async (_req, res, next, quizId) => {
  await Quiz.findById({ _id: quizId }).lean().exec((err, quiz) => {
    if (err) { next(err) }
    const questions = []
    const entries = quiz.quizEntries
    for (const key in entries) {
      questions.push(quiz.quizEntries[key].question)
    }

    const quizToPlay = { title: quiz.title, questions: questions }
    res.json(quizToPlay)
  })
}

exports.play_post = async (req, res, next, quizId) => {
  await Quiz.findById({ _id: quizId }).lean().exec((err, quiz) => {
    if (err) { next(err) }
    const answers = req.body

    const questionsLength = quiz.quizEntries.length
    if (answers.length !== undefined || answers.length !== questionsLength) {
      return next('your answers dont correspond to the number of questions')
    }

    res.send('Ready to play')
  })
}
