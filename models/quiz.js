const mongoose = require('mongoose')

const QuizSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },
  quizEntries: [{ type: Object, ref: 'QuizEntrySchema', required: true, default: undefined }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

})

module.exports = mongoose.model('Quiz', QuizSchema)
