const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');
module.exports = function () {
    //Database connection
    const DB_NAME = config.get('db');
    mongoose.connect(`${DB_NAME}`, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
        .then(() => winston.info(`Connected to ${DB_NAME} MongoDb...`));
}