const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const crypto = require("crypto")
var jwt = require('jsonwebtoken');
//var secret = require('../config').secret;


const UserSchema = new mongoose.Schema({
    userName: {
        type: String, 
        required: [true, "username can't be blank"],
        unique: true, 
        match: [/^[a-zA-Z0-9]+$/, 'only alphanumeric characters can be used for the username']
    },
    hash: {
        type: String
    },
    salt : {
        type: String
    }

}, {timestamps: true})

//function to hash password
UserSchema.methods.setPassword = function(password){
      this.salt = crypto.randomBytes(16).toString('hex');
      this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
     };

//function to validate password
UserSchema.methods.validPassword = function(password) {
         var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
         return this.hash === hash;
     };


UserSchema.plugin(uniqueValidator, {message: "That username is already taken"})
module.exports =  mongoose.model("User", UserSchema)