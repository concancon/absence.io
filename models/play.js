const mongoose = require('mongoose')

const PlaySchema = new mongoose.Schema({

  userName: {
    type: String,
    required: true
  },
  quizTitle: { type: String, required: true },
  points: [{
    question: {
      type: String,
      required: true
    },
    point: {
      type: Number,
      required: true
    }
  }],
  maxPossiblePoints: {
    type: Number,
    required: true
  },
  attempts: {
    type: Number,
    required: true
  }

})
PlaySchema.index({ userName: 1, quizTitle: 1 }, { unique: true })

module.exports = mongoose.model('Play', PlaySchema)
