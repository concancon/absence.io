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
    const { playerEntries } = req.body

    const entries = quiz.quizEntries
    if (playerEntries.length === undefined || playerEntries.length !== entries.length) {
      return next('your answers dont correspond to the number of questions')
    }

    let points = 0
    // make sure the user playerEntries contain the same questions as those in the quiz
    for (const entry in entries) {
      // get that entry's corresponding entry in the player entries via question ref
      // this helps us avoid the case that the user provides the right answer to the wrong question :)
      const playerEntry = playerEntries.find(playerEntry => playerEntry.question === entries[entry].question)

      if (playerEntry.answer === entries[entry].answer) {
        points++
      }
    }
    res.send('number you got right: ' + points)
  })
}
