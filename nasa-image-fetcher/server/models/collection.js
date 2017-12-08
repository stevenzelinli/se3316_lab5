var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// used for nested documents
var ImageSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: String,
        required: true,
        trim: true
    },
    href: {
        type: String,
        required: true,
        trim: true
    }
});

// schema defines collection
var CollectionSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        default: "No Description"
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    images: {
        type: [ImageSchema],
        default: []
    }
});

var Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;