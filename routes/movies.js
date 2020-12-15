//Libraries and methods
const express = require('express')
const router = express.Router();
const {Genre,validateGenre} = require('../models/genres');
const {Movie,validateMovie} = require('../models/movies');

//RESTful APIs
router.get('/',async (req,res)=>{
    const movies =  await Movie.find().sort('name');
    res.send(movies);
});

router.get('/:id', async (req,res)=>{
    //Check for the id existance
    try{
        const movie = await Movie.findById(String(req.params.id));
        if(!movie) throw err;
        res.send(movie);
    }
    catch(err){
        res.status(400).send('The movie with the given id could not be found!');
    }
});

router.post('/', async (req,res)=>{
    //Validating the request body data before updating
    
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let movie = new Movie({
        title: req.body.title,
        genre: {
            _id: req.body.genre.id,
            name: req.body.genre.name
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate
    });
    movie = await movie.save();
    res.send(movie);

});

router.put('/:id',async (req,res)=>{
    //Validating the request body data before updating
    const {error} = validateMovie(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check for the id existance
    const movie = await Movie.findByIdAndUpdate(req.params.id,{
        $set: {
            title: req.body.title,
            genre: {
                _id: req.body.genre.id,
                name: req.body.genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
        }
    },{new:true});
    if(!movie) return res.status(400).send('The movie with the given id could not be found!');

    //Updating the data inside the JSON array we made and sending the updated object as a response
    res.send(movie);
});

router.delete('/:id', async (req,res)=>{
    //Deleting the desired object from the JSON array and returing the deleted data as a response
    const movie = await Movie.findByIdAndRemove(String(req.params.id));
    if(!movie) return res.status(400).send('The movie with the given id could not be found!');

    res.send(movie);
});

module.exports = router;