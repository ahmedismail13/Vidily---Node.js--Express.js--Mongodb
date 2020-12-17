//Libraries and methods
const express = require('express');
const app = express();
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies')
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);

//Database connection
const DB_NAME = 'vidily';
mongoose.connect(`mongodb://localhost/${DB_NAME}`,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true})
 .then(()=> console.log(`Connected to ${DB_NAME} MongoDb...`))
 .catch(error => console.error(`Coudn't connect to ${DB_NAME} MongogDB, `, error));

//JSON parssing for express middleware
app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

//Port installation and listening
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listing to port ${port}...`);
});