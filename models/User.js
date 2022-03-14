const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const uniqueValidator = require("mongoose-unique-validator")

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
    }
}, {timestamps: true})


UserSchema.pre("save", async function (next) {
  
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


UserSchema.plugin(uniqueValidator, {message: "That username is already taken"})

module.exports =  mongoose.model("User", UserSchema)