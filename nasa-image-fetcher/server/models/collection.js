var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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
        type: [String],
        default: []
    }
});

var Collection = mongoose.model('Collection', CollectionSchema);
module.exports = Collection;