const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const crypto = require("crypto")
var jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: [true, "username can't be blank"],
        unique: true, 
        match: [/^[a-zA-Z0-9]+$/, 'only alphanumeric characters can be used for the username']
    },
    password: {
        type: String,
        required: true
    }, 
    role: {
        type: String, 
        default: "guest",
        enum: ["guest", "owner"] 
    },
    
   
    accessToken: {
        type: String
    }

}, {timestamps: true})



UserSchema.plugin(uniqueValidator, {message: "That username is already taken"})

module.exports =  mongoose.model("User", UserSchema)