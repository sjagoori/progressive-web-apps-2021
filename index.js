const port = 3000;

// Our router module
const router = require('./routes/router');

// Express module
const express = require('express');
const app = express();

// Setting EJS as template engine 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

// We're using this file as router for all routes
app.use('/', router);

// Listen to port
app.listen(port);