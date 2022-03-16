const mongoose = require('mongoose')
const { QuizEntrySchema } = require('./quizEntry')

const QuizSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  quizEntries: [QuizEntrySchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

})

module.exports = mongoose.model('Quiz', QuizSchema)
