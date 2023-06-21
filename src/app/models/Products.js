const mongoose = require('mongoose');
var slug = require('mongoose-slug-updater');
mongoose.plugin(slug);
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const product = new Schema({
    name: { type: String},
    description: { type: String},
    manufacturer: { type: String, default:"Updating"},
    material: { type: String, default:"Updating"},
    image: { type: String},
    price: {type: Number},
    slug: {type: String, slug: "name", unique: true},
    storages: [{
        shop: {type: mongoose.Schema.Types.ObjectID, ref: 'Shop'},
        stock: {type: Number, default: 1},
        importValue: {type: Number, default: 0},
        sale: {type: Number, default: 0},
        saleValue: {type: Number, default: 0},
    }]
},{
    timestamps:true,
}
);

module.exports = mongoose.model('Product' , product);