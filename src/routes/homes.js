const express = require('express')
const router = express.Router();

const homesController = require('../app/controllers/HomesController');

router.get('/:cart',homesController.cart);
router.get('/',homesController.index);

module.exports = router;