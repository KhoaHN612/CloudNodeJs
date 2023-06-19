const Product = require('../models/Products');
const slugify = require('slugify');
const {mongooseToObject} = require('../../util/mongoose');
class ProductsController {

    //[GET] /product/add
    add (req, res, next) {
        res.render('products/add')
    }

    //[POST] /product/create
    store (req, res, next) {
        var formData = req.body;

        if (!req.files || Object.keys(req.files).length === 0){
            formData.image = 'NoImage.png';
        } else {
            let image = req.files.image;
            let uploadPath = __dirname  +'/../../public/img/' + slugify(image.name);
            formData.image = slugify(image.name);
            image.mv(uploadPath, function (err) {
                if (err) return res.send(err);
            });
        } 

        const product = new Product(req.body);
        product.save()
        .then(() => res.redirect('/home'))
        .catch(next);
    }

    //[GET] /product/:slug
    detail (req, res, next) {
        Product.findOne({slug: req.params.slug})
        .then(prod => res.render('products/detail', {
            prod: mongooseToObject(prod),
        }))
        .catch(next)
    };



}

module.exports = new ProductsController;