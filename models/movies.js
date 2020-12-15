const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const {validateGenre, genreSchema} = require('./genres');

//Database Schema
const Movie = mongoose.model('Movie', new mongoose.Schema({
    title:{
        type: String,
        minlength: 5,
        maxlength: 255,
        required: true,
        trim:true
    },
    genre: {
        type:genreSchema,
        required:true
    },
    numberInStock :{
        type: Number,
        max: 255,
        min: 0,
        required:true
    },
    dailyRentalRate:{
        type: Number,
        max: 255,
        min: 0,
        required: true
    }

}));

//Input Validation funtion using JOI schemas for the request body
function validateObjects(movie){
    const schema = Joi.object({
        title: Joi.string().min(5).max(100).required(),
        genre: Joi.object({
            _id: Joi.objectId(),
            name: Joi.string()
        }),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required()
    });
    return schema.validate(movie);
}

module.exports.Movie = Movie;
module.exports.validateMovie = validateObjects;