const Product = require('../models/Products');
const Cart = require('../models/Carts');
const Shop = require('../models/Shops');
const slugify = require('slugify');
const {mongooseToObject} = require('../../util/mongoose');
const {mongooseToObjects} = require('../../util/mongoose');
class ProductsController {
  //[GET] /product/add
  add(req, res, next) {
    Shop.find({}).then((shops) => {
      res.render("products/add", {
        shops: mongooseToObjects(shops),
      });
    });
  }

  //[POST] /product/create
  store(req, res, next) {
    var formData = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      formData.image = "NoImage.png";
    } else {
      let image = req.files.image;
      let uploadPath = __dirname + "/../../public/img/" + slugify(image.name);
      formData.image = slugify(image.name);
      image.mv(uploadPath, function (err) {
        if (err) return res.send(err);
      });
    }

    const product = new Product(formData);

    const shopStock = {
      shop: formData.shop,
      stock: formData.stock,
      importValue: formData.import,
    };

    product.storages.push(shopStock);

    product
      .save()
      .then(() => res.redirect("/home"))
      .catch(next);
  }

  //[GET] /product/edit/:slug
  edit(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .then((prod) =>
        res.render("products/edit", {
          prod: mongooseToObject(prod),
        })
      )
      .catch(next);
  }

  //[POST] /product/edit/:slug
  update(req, res, next) {
    var formData = req.body;

    if (!req.files || Object.keys(req.files).length === 0) {
      // formData.image = 'NoImage.png';
    } else {
      let image = req.files.image;
      let uploadPath = __dirname + "/../../public/img/" + slugify(image.name);
      formData.image = slugify(image.name);
      image.mv(uploadPath, function (err) {
        if (err) return res.send(err);
      });
    }

    formData.slug = req.params.slug;
    // res.send(formData);

    const result = Product.updateOne({ slug: req.params.slug }, formData)
      .then(() => res.redirect("/product/" + req.params.slug))
      .catch(next);
    // result.matchedCount;
  }

  //[GET] /product/:slug
  detail(req, res, next) {
    Product.findOne({ slug: req.params.slug })
      .populate("storages.shop")
      .then((prod) =>
        res.render("products/detail", {
          prod: mongooseToObject(prod),
        })
      )
      .catch(next);
  }

  addmorerender(req, res, next) {
    Product.findOne({ slug: req.params.slug }).then((prod) =>
      Shop.find({}).then((shops) => {
        res.render("products/addmore", {
          prod: mongooseToObject(prod),
          shops: mongooseToObjects(shops),
        });
      })
    );
  }

  addmore(req, res, next) {
    var formData = req.body;

    // Product.findOneAndUpdate(
    //   { _id: req.params.id, "storages.shop": { $ne: formData.shop } },
    //   { $push: { storages: { shop: formData.shop, stock: formData.stock } } },
    //   { new: true }
    // )
    //   .then((updatedProduct) => {
    //     if (!updatedProduct) {
    //       // If shopId already exists, update the stock value
    //       return Product.findOneAndUpdate(
    //         { _id: req.params.id, "storages.shop": formData.shop },
    //         { $inc: { "storages.$.stock": formData.stock } },
    //         { new: true }
    //       );
    //     }
    //     return updatedProduct;
    //   })

    Product.findOneAndUpdate(
      { _id: req.params.id, "storages.shop": formData.shop },
      {
        $inc: {
          "storages.$.stock": formData.stock,
          "storages.$.importValue": formData.import,
        },
      },
      { new: true }
    )
      .then((updatedProduct) => {
        if (!updatedProduct) {
          // If formData.shop doesn't exist, add a new entry
          return Product.findByIdAndUpdate(
            req.params.id,
            {
              $push: {
                storages: {
                  shop: formData.shop,
                  stock: formData.stock,
                  importValue: formData.import,
                },
              },
            },
            { new: true }
          );
        }
        return updatedProduct;
      })
      .then((updatedProduct) => {
        res.redirect("/product/manage");
      });
  }

  addToCart(req, res, next) {
    // Product.findById(req.params.id).then((foundProduct) => {
    //   const product = {
    //     item: foundProduct._id,
    //     qty: 1,
    //     price: foundProduct.price ,
    //   };
    //   // res.send(product)
    //   const cart = Cart.findOne({owner: req.user._id})
    //   .then(cart => {
    //     cart.owner = req.user._id;
    //     cart.items.push(product);
    //     // res.send(cart);
    //     cart.save();
    //     res.redirect("/cart");
    //   }
    //   )
    // });

    Product.findById(req.params.id)
      .then(async (foundProduct) => {
        const product = {
          item: foundProduct._id,
          qty: req.body.quantity,
          shop: req.body.shop,
          price: foundProduct.price,
        };

        let cart = await Cart.findOne({ owner: req.user._id });
        if (cart) {
          // Check if the product already exists in the cart
          const existingProduct = cart.items.find(
            (item) =>
              item.item.equals(foundProduct._id) &&
              item.shop.equals(req.body.shop)
          );
          if (existingProduct) {
            // If the product exists, increment the quantity
            existingProduct.qty += req.body.quantity;
          } else {
            // If the product doesn't exist, add it to the cart
            cart.items.push(product);
          }
        } else {
          // If the cart doesn't exist, create a new cart with the product
          cart = new Cart({
            owner: req.user._id,
            items: [product],
          });
        }

        await cart.save();
        res.redirect("/cart");
      })
      .catch((err) => {
        res.send(err);
      });
  }

  removeFromCart(req, res, next) {
    Cart.updateOne(
      { owner: req.user._id },
      { $pull: { items: { _id: req.params.id } } }
    )
      .exec()
      .then((result) => {
        // res.send(result);
        res.redirect("/cart");
      });
  }

  //[GET] /product/delete/:slug
  delete(req, res, next) {
    Product.deleteOne({ slug: req.params.slug })
      .then(() => res.redirect("/home"))
      .catch(next);
  }

  //[GET] /product/manage
  manage(req, res, next) {
    Product.find({})
      .then((products) => {
        res.render("products/manage", {
          products: mongooseToObjects(products),
        });
      })
      .catch(next);
  }
}

module.exports = new ProductsController;