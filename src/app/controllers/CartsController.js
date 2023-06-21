const Product = require('../models/Products');
const Cart = require('../models/Carts');
const Order = require('../models/Orders');
const {mongooseToObjects} = require('../../util/mongoose');
const {mongooseToObject} = require('../../util/mongoose');
class CartsController {

    //[GET] /cart
    index (req, res) {
        Cart.find({owner: req.user._id}).populate('items.item').populate('items.shop')
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

    //[GET] /cart/payment
    payment(req, res, next) {
        Cart.findOne({ owner: req.user._id })
          .populate("items.item")
          .exec()
          .then((cart) => {
            if (!cart) {
              console.log("Cart not found.");
              return;
            }
    
            // Iterate over each item in the cart
            cart.items.forEach((item) => {
              // Create a new Order document using the item details from the cart
              const order = new Order({
                owner: cart.owner,
                item: item.item._id,
                qty: item.qty,
                shop: item.shop,
                price: item.price,
              });

              // Decrease the stock of the shop
              const shopId = item.shop._id;
              const productId = item.item._id;
              const quantity = item.qty;
              const price = item.qty * item.price;

              Product.updateOne(
                { _id: productId, "storages.shop": shopId },
                { $inc: { "storages.$.sale": quantity, "storages.$.saleValue": price } }
              ).exec();

              // Save the new Order document
              order.save();
            });
    
            // Delete the cart
            cart.items = [];
            return cart.save();
          })
          .then(() => {
            console.log('Items move from cart to order successfully!');
            res.redirect('/history')
          })
          .catch((error) => {
            console.error("Error moving cart data:", error);
          });
      }
}

module.exports = new CartsController;