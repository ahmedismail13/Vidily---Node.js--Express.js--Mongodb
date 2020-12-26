//Libraries and methods
const express = require('express')
const router = express.Router();
const {Genre,validate} = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

//RESTful APIs
router.get('/', async (req,res)=>{
    throw new Error('Could not get the genres');
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
    //Validating the request body data before updating
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check for the id existance
    const genre = await Genre.findById(String(req.params.id));
    if(!genre) return res.status(400).send('The genre with the given id could not be found!');

    //Updating the data inside the JSON array we made and sending the updated object as a response
    genre.name = req.body.name;
    genre.save();
    res.send(genre);
});

router.post('/',auth, async (req,res)=>{
    //Validating the request body data before updating
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);

});

router.delete('/:id',[auth,admin], async (req,res)=>{
    //Deleting the desired object from the JSON array and returing the deleted data as a response
    const genre = await Genre.findByIdAndRemove(String(req.params.id));
    if(!genre) return res.status(400).send('The genre with the given id could not be found!');

    res.send(genre);
});

module.exports = router;