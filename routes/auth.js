//Libraries and methods
const _ = require('lodash');
const express = require('express')
const router = express.Router();
const {User} = require('../models/user');
const bcrypt = require('bcrypt');
const Joi = require('joi');

//RESTful APIs
router.post('/',async (req,res)=>{
    //Validating the request body data before updating
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.');

    res.send(true);
});
//Input Validation funtion using JOI schemas for the request body
function validate(req){
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    });
    return schema.validate(req);
}
module.exports = router;