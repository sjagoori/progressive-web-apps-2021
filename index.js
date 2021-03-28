const port = process.env.PORT || 3000;

const router = require('./routes/router');
const express = require('express');
const app = express();
const compression = require('compression')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/static'));
app.use(compression())
app.use('/', router);

app.listen(port);