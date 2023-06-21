const Products = require('../models/Products');
const Cart = require('../models/Carts');
const {mongooseToObjects} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class HomesController {

    //[GET] /home
    index (req, res, next) {
        Products.find({})
        .then(products => {res.render('home',{
            products: mongooseToObjects(products),
        })})
        .catch(next)
    };

    //[GET] /cart
    cart (req, res) {
        Cart.find({owner: req.user._id}).populate('items.item')
        .then(
            (userCart) => {
                userCart = userCart[0];
                const pPrice = userCart.items.map(p => p.price);
                const totalPrice = pPrice.reduce((a, b) => a + b, 0);
                userCart.totalPrice = totalPrice;
                userCart.save()
                res.render("cart", {
                    cart: mongooseToObject(userCart),
                    cartSee:userCart,
                });
            }
        )
        // .catch(res.send('Something happen'));
    }

}

module.exports = new HomesController;