const express = require('express')
const router = express.Router();

const sitesController = require('../app/controllers/SitesController');
const homesController = require('../app/controllers/HomesController');
const connectEnsureLogin = require('connect-ensure-login'); //authorization

router.get('/cart',connectEnsureLogin.ensureLoggedIn(), homesController.cart);
router.get('/login',sitesController.login);
router.get('/search',sitesController.searchGet);
router.post('/search',sitesController.searchPost);
router.get('/test',sitesController.test);

router.get('/',sitesController.home);

module.exports = router;