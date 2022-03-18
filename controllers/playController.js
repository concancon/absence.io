const Play = require('../models/play')
const Quiz = require('../models/Quiz')
const User = require('../models/User')

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
  await Quiz.findById({ _id: quizId }).lean().exec(async (err, quiz) => {
    if (err) { next(err) }
    if (!quiz) { return next('quiz not found') }
    const { playerEntries } = req.body

    const entries = quiz.quizEntries
    if (playerEntries.length === undefined || playerEntries.length !== entries.length) {
      return next('your answers dont correspond to the number of questions')
    }

    let newPoints = 0
    // make sure the user playerEntries contain the same questions as those in the quiz
    for (const entry in entries) {
      // get that entry's corresponding entry in the player entries via question ref
      // this helps us avoid the case that the user provides the right answer to the wrong question :)
      const playerEntry = playerEntries.find(playerEntry => playerEntry.question === entries[entry].question)

      if (playerEntry.answer === entries[entry].answer) {
        newPoints++
      }
    }

    const quizPlayer = res.locals.user._id
    await User.findById({ _id: quizPlayer }).exec(async (err, user) => {
      if (err) { next(err) }
      // todo: make sure that a quiz title and a quiz player is a unique entity

      await Play.findOne({ userName: user.userName, title: quiz.title }).exec(async (err, previousStats) => {
        if (err) { next(err) }

        previousStats.points.push(newPoints)
        previousStats.attempts++
        await previousStats.save().catch(err => {
          return next(err)
        })
        res.json(previousStats)
      }

      )
    })
  })
}
