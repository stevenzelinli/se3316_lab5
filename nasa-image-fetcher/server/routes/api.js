const express = require('express');
const router = express.Router();
var User = require('../models/user');

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// more routes for our API will happen here

// ----------------------------------------------------
router.route('/users')
    // create user
    .post(function (req, res, next) {
        // IF REGISTERING NEW USER
        if (req.body.email &&
            req.body.password) {
            var user = new User();
            user.email = req.body.email; // set user text
            user.password = req.body.password;
            // save the user and check for errors
            user.save(function (err) {
                if (err)
                    res.send(err);
                res.json({ message: 'Success' });
                // return res.redirect('profile');
            });
        }
        // EXISTING USER
        else if (req.body.login_email && req.body.login_password) {
            User.authenticate(req.body.login_email, req.body.login_password, function (error, user) {
                if (error || !user) {
                    var err = new Error("Wrong email or password.");
                    err.status = 401;
                    res.status(401).send({ message: "Wrong email or password." });
                    return next(err);
                }
                else {
                    res.json({ message: 'Success' });
                    //return res.redirect('profile');
                }
            });
        }
        // MISSING FIELDS
        else {
            var err = new Error("Missing Fields.");
            err.status = 400;
            res.status(400).send({ message: "Missing Fields." });
            return next(err);
        }
    })
    // get users
    .get(function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

router.route('/users/:email')
    // get the user associated with the email
    .get(function (req, res) {
        user.find({ "email": req.params.email }, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });

// logout route
router.get('/logout', function (req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function (err) {
            if (err) {
                return next(err);
            } else {
                return res.redirect('/home'); // bring back to home page
            }
        });
    }
});

module.exports = router;