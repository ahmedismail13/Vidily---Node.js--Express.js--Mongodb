const Joi = require('joi');
const mongoose = require('mongoose');

//Database schema
const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 5,
        maxlength: 50,
        required: true
    }
});

const Genre = mongoose.model('Genre', genreSchema);

//Input Validation funtion using JOI schemas for the request body
function validateObjects(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required()
    });
    return schema.validate(genre);
}
module.exports.Genre = Genre;
module.exports.validate = validateObjects;
module.exports.genreSchema = genreSchema;