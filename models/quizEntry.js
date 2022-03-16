const mongoose = require('mongoose')

const QuizEntrySchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }

})
const QuizEntryModel = mongoose.model('QuizEntryModel', QuizEntrySchema)
module.exports = { QuizEntryModel, QuizEntrySchema }
