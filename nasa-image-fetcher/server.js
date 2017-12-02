// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
const http = require('http');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');


mongoose.connect('mongodb://localhost:8070/users');
var User = require('./server/models/user');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

const port = process.env.PORT || 8080; // set our port
app.set('port', port);
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here

// ----------------------------------------------------
router.route('/users')
    // create user
    .post(function(req, res) {
        var user = new user();
        user.email = req.body.email; // set user text
        user.password = req.body.password;
        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);
            res.json({ user: 'user created!' });
        });

    })
    // get users
    .get(function(req, res) {
        user.find(function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

router.route('/users/:email')

    // get the user associated with the email
    .get(function(req, res) {
        user.find({ "email": req.params.email }, function(err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// REDIRECT TO ANGULAR
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// START THE SERVER
// =============================================================================

const server = http.createServer(app);
server.listen(port, () => console.log(`API running on localhost:${port}`));

// Functions
