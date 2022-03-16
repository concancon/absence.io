const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  quizEntries: [{ type: [String], ref: 'QuizEntrySchema', required: true }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

})

module.exports = mongoose.model('Quiz', QuizSchema)
