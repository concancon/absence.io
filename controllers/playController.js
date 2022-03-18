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
  const quiz = await Quiz.findById({ _id: quizId }).catch(err => {
    return next(err)
  })

  if (!quiz) { return next('quiz not found') }

  const { quizEntries } = req.body

  const entries = quiz.quizEntries

  if (!quizEntries) {
    return next('you must define an array with key value quizEntries')
  }
  if (quizEntries.length === undefined || quizEntries.length !== entries.length) {
    return next('your answers dont correspond to the number of questions')
  }
  const newPoints = {}
  for (const entry in entries) {
    // get that entry's corresponding entry in the player entries via question ref
    // this helps us avoid the case that the user provides the right answer to the wrong question :)
    const playerEntry = quizEntries.find(playerEntry => playerEntry.question === entries[entry].question)

    if (playerEntry.answer === entries[entry].answer) {
      newPoints[entries[entry].question] = 1
    } else {
      newPoints[entries[entry].question] = 0
    }
  }

  const quizPlayer = res.locals.user._id

  const user = await User.findById({ _id: quizPlayer }).catch(err => {
    return next(err)
  })
  if (!user) { return next('user not found') }

  await Play.findOne({ userName: user.userName, title: quiz.title }).exec(async (err, previousStats) => {
    if (err) { next(err) }
    if (!previousStats) {
      const newStats = new Play({ userName: user.userName, quizTitle: quiz.title, maxPossiblePoints: quiz.quizEntries.length, attempts: 1 })
      for (const entry in newPoints) {
        newStats.points.push({ question: entry, point: newPoints[entry] })
      }

      await newStats.save().catch(err => {
        return next(err)
      })
      res.json(newStats)
    }

    for (const entry in newPoints) {
      previousStats.points.push({ question: entry, point: newPoints[entry] })
    }
    previousStats.attempts++

    await previousStats.save().catch(err => {
      return next(err)
    })
    res.json(previousStats)
  })
}
