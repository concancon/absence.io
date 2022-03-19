const Quiz = require('../models/Quiz')
const { QuizEntryModel } = require('../models/quizEntry')

// Display list of all quizes for currently logged in user.
exports.quiz_list = async (_req, res, next) => {
  try {
    const userId = res.locals.user._id
    await Quiz.find({ createdBy: userId }).lean().exec((err, quizes) => {
      if (err) { next(err) }
      res.json(quizes)
    })
  } catch (error) { next(error) }
}

// Display detail page for a specific quiz.
exports.quiz_detail = async (_req, res, next, quizId) => {
  await Quiz.find({ _id: quizId }).lean().exec((err, quiz) => {
    if (err) { next(err) }
    res.json(quiz)
  })
}

// Handle quiz create on POST.
exports.quiz_create_post = async (req, res, next) => {
  try {
    const createdBy = res.locals.user._id

    const { title, quizEntries } = req.body

    const newQuiz = new Quiz({
      title: title, createdBy: createdBy
    })
    if (Object.values(quizEntries).length > 0) {
      newQuiz.quizEntries = [] // we must initialize the array as we have set it to undefined in schema
    }
    for (const key in quizEntries) {
      const newQuizEntry = new QuizEntryModel({ question: quizEntries[key].question, answer: quizEntries[key].answer })
      newQuiz.quizEntries.push(newQuizEntry)
    }

    await newQuiz.save()
    res.json(newQuiz)
  } catch (error) {
    next(error)
  }
}

// Handle quiz update on POST.
exports.quiz_update_post = async function (req, res, next, quizId) {
  try {
    const createdBy = res.locals.user._id
    // check if the logged in user is the owner of the quiz
    const quiz = await Quiz.findById(quizId)
    if (quiz) {
      if (quiz.createdBy.equals(createdBy)) {
        const { question, answer } = req.body
        const newEntry = new QuizEntryModel({ question, answer })
        const validationResult = newEntry.validateSync()
        if (validationResult) {
          return next(' a quiz entry corresponds of one question and one answer. You failed to provide one of them')
        }

        quiz.quizEntries.push(newEntry)

        await quiz.save()
        res.json(quiz)
      } else {
        res.send('sorry you cant edit this quiz. Because it\'s not your quiz \n')
      }
    } else {
      res.send('that quiz id was not found in the database')
    }
  } catch (error) {
    next(error)
  }
}

// Display quiz delete form on GET.
exports.quiz_delete_get = async (req, res, next, quizId) => {
  try {
    const createdBy = res.locals.user._id

    const quiz = await Quiz.findById(quizId)
    if (quiz) {
      if (quiz.createdBy.equals(createdBy)) {
        await Quiz.findByIdAndDelete(quizId)
        res.send('quiz deleted')
      } else {
        res.send('you are not the owner of that quiz and thus can\'t delete it')
      }
    } else {
      next('that quiz doesnt exist')
    }
  } catch (err) {
    next(err)
  }
}
