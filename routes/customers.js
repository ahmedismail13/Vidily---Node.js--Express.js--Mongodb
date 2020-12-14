//Libraries and methods
const express = require('express')
const router = express.Router();
const {Customer, validate} = require('../models/customer');

//RESTful APIs
router.get('/', async (req,res)=>{
    const result = await Customer.find().sort({name:1});
    res.send(result);
});

router.get('/:id', async (req,res)=>{
    //Check for the id existance
    try{
        const customer = await Customer.findById(String(req.params.id));
        if(!customer) throw err;
        res.send(customer);
    }
    catch(err){
        res.status(400).send('The customer with the given id could not be found!');
    }
});

router.post('/', async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    try{
        let customer = new Customer(req.body);
        customer = await customer.save();
        res.send(customer);
    }
    catch(err){
        res.status(400).send(err.message);
    }
});

router.put('/:id',async (req,res)=>{
    //Validating the request body data before updating
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //Check for the id existance
    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        $set: {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }
    },{new:true});
    if(!customer) return res.status(400).send('The customer with the given id could not be found!');

    //Updating the data inside the JSON array we made and sending the updated object as a response
    res.send(customer);
});

router.delete('/:id', async (req,res)=>{
    //Deleting the desired object from the JSON array and returing the deleted data as a response
    const customer = await Customer.findByIdAndRemove(String(req.params.id));
    if(!customer) return res.status(400).send('The customer with the given id could not be found!');

    res.send(customer);
});

module.exports = router;