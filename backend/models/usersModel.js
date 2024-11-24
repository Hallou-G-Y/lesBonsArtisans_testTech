const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true }, // unique: true is a validator
    password: { type: String, required: true }, // password is hashed
    isAdmin: { type: Boolean, default: false } // isAdmin is a boolean
})

userSchema.plugin(uniqueValidator) // uniqueValidator is a plugin
module.exports = mongoose.model('User', userSchema)