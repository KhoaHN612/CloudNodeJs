const Products = require('../models/Products');
const {mongooseToObjects} = require('../../util/mongoose');
class HomesController {

    //[GET] /home
    index (req, res, next) {
        Products.find({})
        .then(products => {res.render('home',{
            products: mongooseToObjects(products),
        })})
        .catch(next)
    };

    //[GET] /home/cart
    cart (req, res) {
        res.send("This is cart");
    }
}

module.exports = new HomesController;