const SitesController = require('../app/controllers/SitesController');
const homesRouter = require('./homes');
const sitesRouter = require('./sites');

function route(app){

    app.use('/home', homesRouter);

    app.get('/login', (req, res) => {
      res.render("login");
    });

    app.use('/',sitesRouter);

}

module.exports = route;