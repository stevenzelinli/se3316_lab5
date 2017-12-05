// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express'); // call express
const app = express(); // define our app using express
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

mongoose.connect('mongodb://localhost:8070/users');
var User = require('./server/models/user');
var Collection = require('./server/models/collection');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// set ports
const port = process.env.PORT || 8080; // set our port
app.set('port', port);

// ROUTES FOR OUR API
// =============================================================================
const api = require('./server/routes/api');

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', api);

// REDIRECT TO ANGULAR
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// START THE SERVER
// =============================================================================
const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

// Functions
