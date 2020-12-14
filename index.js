//Libraries and methods
const express = require('express')
const app = express();
const genres = require('./routes/genres');
const mongoose = require('mongoose');

//Database connection
const DB_NAME = 'vidily';
mongoose.connect(`mongodb://localhost/${DB_NAME}`,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false})
 .then(()=> console.log(`Connected to ${DB_NAME} MongoDb...`))
 .catch(error => console.error(`Coudn't connect to ${DB_NAME} MongogDB, `, error));

//JSON parssing for express middleware
app.use(express.json());
app.use('/api/genres',genres);

//Port installation and listening
const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Listing to port ${port}...`);
});