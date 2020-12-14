const Joi = require('joi');
const mongoose = require('mongoose');

//Database schema
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: true
    }
}));

//Input Validation funtion using JOI schemas for the request body
function validateObjects(genre){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}
module.exports.Genre = Genre;
module.exports.validate = validateObjects;