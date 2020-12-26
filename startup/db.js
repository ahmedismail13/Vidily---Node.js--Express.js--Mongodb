const mongoose = require('mongoose');
const winston = require('winston');
module.exports = function (){
    //Database connection
    const DB_NAME = 'vidily';
    mongoose.connect(`mongodb://localhost/${DB_NAME}`,{useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false,useCreateIndex:true})
    .then(()=> winston.info(`Connected to ${DB_NAME} MongoDb...`));
}