//Libraries and methods
require('express-async-errors');
require('winston-mongodb');
const config = require('config');
const winston = require('winston');
const express = require('express');
const error = require('./middleware/error');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies')
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');
const mongoose = require('mongoose');
const Joi = require('Joi');
Joi.objectId = require('joi-objectid')(Joi);
const app = express();

winston.exceptions.handle(
    new winston.transports.File({filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection',(ex)=>{
    throw ex;
});

//Logger
winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB({db : 'mongodb://localhost/vidily', options:{useUnifiedTopology: true}}));

// throw new Error('Something failed during startup.');
const p = Promise.reject(new Error('Something failed miserably!'));
p.then(()=> console.log('Done'));

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}
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

app.use(error);

//Port installation and listening
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listing to port ${port}...`);
});