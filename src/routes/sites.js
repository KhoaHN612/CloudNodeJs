const express = require('express');
const router = express.Router();

const sitesController = require('../app/controllers/SitesController');
const homesController = require('../app/controllers/HomesController');
const connectEnsureLogin = require('connect-ensure-login'); //authorization

router.get('/login',sitesController.login);
router.get('/history',connectEnsureLogin.ensureLoggedIn(), sitesController.history);
router.get('/statistic',connectEnsureLogin.ensureLoggedIn(), sitesController.statistic);
router.get('/search',sitesController.searchGet);
router.post('/search',sitesController.searchPost);

router.get('/test',sitesController.test);

router.get('/',homesController.index);

module.exports = router;