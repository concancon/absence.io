const mongoose = require('mongoose')
const { QuizEntrySchema } = require('./quizEntry')

const QuizSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  quizEntries: { type: [QuizEntrySchema], required: true, default: undefined },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

})

module.exports = mongoose.model('Quiz', QuizSchema)
