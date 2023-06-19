const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const product = new Schema({
    name: { type: String},
    description: { type: String},
    image: { type: String},
    price: {type: Number},
    slug: {type: String, slug: "name", unique: true},
});

module.exports = mongoose.model('Product' , product);