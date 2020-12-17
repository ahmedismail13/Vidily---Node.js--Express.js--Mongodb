const Joi = require('joi');
const mongoose = require('mongoose');

//Database schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 3,
        maxlength: 1024,
        required: true
    }
});

const User = mongoose.model('User', userSchema );

//Input Validation funtion using JOI schemas for the request body
function validateObjects(user){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(user);
}
module.exports.User = User;
module.exports.validateUser = validateObjects;