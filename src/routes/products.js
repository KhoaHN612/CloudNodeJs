const express = require('express')
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

router.get('/add',productsController.add);
router.post('/store',productsController.store);
router.get('/:slug',productsController.detail);

module.exports = router;