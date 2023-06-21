const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const order = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectID, ref: 'User'},
    item: {type: mongoose.Schema.Types.ObjectID, ref: 'Product'},
    qty: {type: Number, default: 1},
    shop: {type: mongoose.Schema.Types.ObjectID, ref: 'Shop'},
    price: {type: Number, default: 0},
},{timestamps:true}
);

module.exports = mongoose.model('Order' , order);