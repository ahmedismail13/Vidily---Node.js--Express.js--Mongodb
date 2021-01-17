//Libraries and methods
const winston = require('winston');
const express = require('express');
const app = express();

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

//Port installation and listening
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    winston.info(`Listing to port ${port}...`);
});

module.exports = server;