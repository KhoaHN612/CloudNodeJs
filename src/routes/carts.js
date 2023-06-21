const express = require('express');
const router = express.Router();

const cartsController = require('../app/controllers/CartsController');
const connectEnsureLogin = require('connect-ensure-login'); //authorization

router.get('/',connectEnsureLogin.ensureLoggedIn(), cartsController.index);
router.get('/payment',connectEnsureLogin.ensureLoggedIn(),cartsController.payment);

module.exports = router;