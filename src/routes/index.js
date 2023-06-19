const homesRouter = require('./homes');
const sitesRouter = require('./sites');
const productsRouter = require('./products');

function route(app){

    app.use('/home', homesRouter);

    app.use('/product', productsRouter);

    app.get('/login', (req, res) => {
      res.render("login");
    });

    app.use('/',sitesRouter);

}

module.exports = route;