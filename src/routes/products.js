const express = require('express')
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

router.get('/add',productsController.add);
router.post('/store',productsController.store);
router.get('/edit/:slug', productsController.edit);
router.post('/edit/:slug', productsController.update);
router.get('/manage',productsController.manage)

router.get('/:slug',productsController.detail);

module.exports = router;