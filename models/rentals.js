const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

const rentalSchema = new mongoose.Schema({
    customer :{
        type: new mongoose.Schema({
            name: {
                type: String,
                minlength: 5,
                maxlength: 50,
                required: true
            },
            isGold: {
                type: Boolean,
                required: false
            },
            phone: {
                type: String,
                minlength: 5,
                maxlength: 50,
                require: true
            }
        }),
        required: true
    },
    movie:{
        type: new mongoose.Schema({
            title:{
                type: String,
                minlength: 5,
                maxlength: 255,
                required: true,
                trim:true
            },
            dailyRentalRate:{
                type: Number,
                max: 255,
                min: 0,
                required: true
            }
        }),
        required: true
    },
    dateOut: {
        type: Date,
        required: true,
        default: Date.now
    },
    dateReturned: {
        type: Date
    },
    rentalFee: {
        type: Number,
        min: 0
    }
});

const Rental = mongoose.model('Rental',rentalSchema);

function validateRental(rental){
    const schema = Joi.object({
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    });
    return schema.validate(rental);
}

module.exports.rentalSchema = rentalSchema;
module.exports.Rental = Rental;
module.exports.validateRental = validateRental;
