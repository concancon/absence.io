const mongoose = require("mongoose")



const QuizSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",     
    }


})

module.exports =  mongoose.model("Quiz", QuizSchema)