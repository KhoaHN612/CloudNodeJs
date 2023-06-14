const express = require('express')
const router = express.Router();

const sitesController = require('../app/controllers/SitesController');

router.get('/login',sitesController.login);
router.get('/search',sitesController.searchGet);
router.post('/search',sitesController.searchPost);
router.get('/',sitesController.home);

module.exports = router;