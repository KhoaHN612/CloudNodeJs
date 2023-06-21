const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cart = new Schema({
    owner: {type: mongoose.Schema.Types.ObjectID, ref: 'User'},
    totalPrice: {type: Number, default: 0},
    items: [{
        item: {type: mongoose.Schema.Types.ObjectID, ref: 'Product'},
        qty: {type: Number, default: 1},
        shop: {type: mongoose.Schema.Types.ObjectID, ref: 'Shop'},
        price: {type: Number, default: 0},
    }]
});

module.exports = mongoose.model('Cart' , cart);