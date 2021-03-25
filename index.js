const port = process.env.PORT || 3000;

const router = require('./routes/router');
const express = require('express');
const app = express();

// Setting EJS as template engine 
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));

// We're using this file as router for all routes
app.use('/', router);

// Listen to port
app.listen(port);