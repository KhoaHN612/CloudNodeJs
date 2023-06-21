const express = require('express')
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');
const connectEnsureLogin = require('connect-ensure-login'); //authorization

router.get('/add',connectEnsureLogin.ensureLoggedIn(),productsController.add);
router.post('/store',connectEnsureLogin.ensureLoggedIn(),productsController.store);

router.get('/edit/:slug',connectEnsureLogin.ensureLoggedIn(), productsController.edit);
router.post('/edit/:slug',connectEnsureLogin.ensureLoggedIn(), productsController.update);

router.get('/addmore/:slug',connectEnsureLogin.ensureLoggedIn(), productsController.addmorerender);
router.post('/addmore/:id',connectEnsureLogin.ensureLoggedIn(), productsController.addmore);

router.get('/delete/:slug',connectEnsureLogin.ensureLoggedIn(), productsController.delete);

router.get('/manage',connectEnsureLogin.ensureLoggedIn(), productsController.manage)

router.post('/:id/addCart',connectEnsureLogin.ensureLoggedIn(), productsController.addToCart);
router.get('/:id/removeCart',connectEnsureLogin.ensureLoggedIn(), productsController.removeFromCart);

router.get('/:slug',productsController.detail);

module.exports = router;