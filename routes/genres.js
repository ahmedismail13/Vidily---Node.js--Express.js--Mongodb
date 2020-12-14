//Libraries and methods
const express = require('express')
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');

//Database schema
const Genre = new mongoose.model('Genre', new mongoose.Schema({
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

//JSON data for testing purposes
// const genres = [
//     {id:1,name:'Rock'},
//     {id:2,name:'EDM'},
//     {id:3,name:'Rap'},
//     {id:4,name:'Classic'},
//     {id:5,name:'Jazz'},
//     {id:6,name:'Indie'},
//     {id:7,name:'Metal'},
// ]

//RESTful APIs
router.get('/',async (req,res)=>{
    const genres =  await Genre.find().sort('name');
    res.send(genres);
});

router.get('/:id', async (req,res)=>{
    //Check for the id existance
    try{
        const genre = await Genre.findById(String(req.params.id));
        if(!genre) throw err;
        res.send(genre);
    }
    catch(err){
        res.status(400).send('The genre with the given id could not be found! ');
    }
});

router.put('/:id',async (req,res)=>{
    //Check for the id existance
    const genre = await Genre.findById(String(req.params.id));
    if(!genre) return res.status(400).send('The genre with the given id could not be found!');

    //Validating the request body data before updating
    const {error} = validateObjects(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    //Updating the data inside the JSON array we made and sending the updated object as a response
    genre.name = req.body.name;
    genre.save();
    res.send(genre);
});

router.post('/', async (req,res)=>{
    //Validating the request body data before updating
    const {error} = validateObjects(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save();
    res.send(genre);

});

router.delete('/:id', async (req,res)=>{
    //Deleting the desired object from the JSON array and returing the deleted data as a response
    const genre = await Genre.findByIdAndRemove(String(req.params.id));
    if(!genre) return res.status(400).send('The genre with the given id could not be found!');

    res.send(genre);
});

module.exports = router;