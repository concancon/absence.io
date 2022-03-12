const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: [true, "username can't be blank"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "password can't be blank"]
    }
}, {timestamps: true})

userSchema.plugin(uniqueValidator, {message: "That username is already taken"})
module.exports =  mongoose.model("User", userSchema)