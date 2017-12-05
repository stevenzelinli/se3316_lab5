const express = require('express');
const router = express.Router();
var User = require('../models/user');
var Collection = require('../models/collection');

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
                    res.json({ id: user._id });
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
// specific user
router.route('/users/:email')
    // get the user associated with the email
    .get(function (req, res) {
        User.find({ "email": req.params.email }, function (err, users) {
            if (err)
                res.send(err);
            res.json(users);
        });
    });
// collections
router.route('/collections')
    .post(function (req, res, next) {
        // new collection
        if (req.body.create_collection_name && req.body.create_collection_author && req.body.create_collection_description) {
            var collection = new Collection();
            collection.name = req.body.create_collection_name;
            collection.author = req.body.create_collection_author;
            collection.description = req.body.create_collection_description;
            collection.save(function (err) {
                if (err)
                    res.send(err);
                User.findOne({ email: req.body.create_collection_author }).exec(function (err, user) {
                    if (err)
                        res.send(err);
                    else if(!user){
                        var err = new Error('User not found.');
                        err.status = 401;
                        res.send(err);
                    }
                    user.collections.push(collection._id);
                });
                res.json({ id: collection._id });
            });
        }
        // change description
        else if (req.body.collection_id && req.body.collection_description) {
            Collection.findById(req.body.collection_id)
                .exec(function (err, collection) {
                    if (err) {
                        res.send(err);
                    }
                    else if(!collection){
                        var err = new Error('Collection not found.');
                        err.status = 401;
                        res.send(err);
                    }
                    collection.description = req.body.collection_description;
                    res.json({ message: 'Success' });
                });
        }
        // add image
        else if (req.body.collection_id && req.body.add_image) {
            Collection.findById(req.body.collection_id)
            .exec(function (err, collection) {
                if (err) {
                    res.send(err);
                } else if (!collection) {
                    var err = new Error('Collection not found.');
                    err.status = 401;
                    res.send(err);
                }
                collection.images.push(req.body.add_image);
                res.json({ message: 'Success' });
            });
        }
        // remove image
        else if (req.body.collection_id && req.body.remove_image) {
            Collection.findById(req.body.collection_id)
            .exec(function (err, collection) {
                if (err) {
                    res.send(err);
                } else if (!collection) {
                    var err = new Error('Collection not found.');
                    err.status = 401;
                    res.send(err);
                }
                collection.images.splice(collection.images.findIndex(function(image){
                    return image == req.body.remove_image;
                }),1);
                res.json({ message: 'Success' });
            });
        }
        // change name
        else if (req.body.collection_id && req.body.new_name) {
            Collection.findById(req.body.collection_id)
            .exec(function (err, collection) {
                if (err) {
                    res.send(err);
                } else if (!collection) {
                    var err = new Error('Collection not found.');
                    err.status = 401;
                    res.send(err);
                }
                collection.name = req.body.new_name;
                res.json({ message: 'Success' });
            });
        }
        else{
            var err = new Error("Missing Fields.");
            err.status = 400;
            res.status(400).send({ message: "Missing Fields." });
            return next(err);
        }
    })
    .get(function (req, res) {
        Collection.find(function (err, collections) {
            if (err)
                res.send(err);
            res.json(collections);
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