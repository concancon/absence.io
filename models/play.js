const mongoose = require('mongoose')

const PlaySchema = new mongoose.Schema({

  userName: {
    type: String,
    required: true
  },
  quizTitle: { type: String, required: true },
  points: {
    type: Number,
    required: true
  },
  maxPoints: {
    type: Number,
    required: true
  },
  attempts: {
    type: Number,
    required: true
  }

})

module.exports = mongoose.model('Play', PlaySchema)
