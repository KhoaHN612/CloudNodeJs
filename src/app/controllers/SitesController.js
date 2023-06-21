const Product = require('../models/Products');
const Order = require('../models/Orders');
const Shop = require('../models/Shops');
const {mongooseToObjects} = require('../../util/mongoose');
class SitesController {
  //[GET] /login
  login(req, res) {
    res.render("login");
  }

  //[GET] /
  home(req, res) {
    console.log('Home');
    res.render("home");
  }

  history(req, res) {
    Order.find({owner: req.user._id}).populate('item').populate('shop').exec()
    .then(
      orders => res.render('history', {orders: mongooseToObjects(orders)})
    )
    // res.render("history");
  }

  statistic(req, res) {
    Product.find({}).populate('storages.shop')
    .then(products => {
      res.render('statistic', {products : mongooseToObjects(products)})
      // res.send(products)
    })
    .catch(err => res.send(err))
  }

  //[GET] /search
  searchGet(req, res) {
    console.log(req.query);
    res.render("search");
  }

  //[POST] /search
  searchPost(req, res) {
    console.log(req.body);
    res.render("search");
  }

  test(req,res){
    res.render('test');
  }
}

module.exports = new SitesController;