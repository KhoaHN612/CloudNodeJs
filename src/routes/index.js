const homesRouter = require('./homes');
const sitesRouter = require('./sites');
const productsRouter = require('./products');
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication

function route(app){

    app.use(function(req, res, next) {
      res.locals.user =  req.user ? req.user.toObject() : null;
      next();
    });

    app.use('/home', homesRouter);

    app.use('/product', productsRouter);

    app.get('/login', (req, res) => {
      res.render("login");
    });

    app.get('/dashboard', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
      res.send(`Hello ${req.user.username}. Your session ID is ${req.sessionID} 
      and your session expires in ${req.session.cookie.maxAge} 
      milliseconds.<br><br>
      <a href="/logout">Log Out</a><br><br><a href="/secret">Members Only</a>`);
    });

    app.get('/test',function(req, res) {
      res.render('test');
    });

    app.get('/logout', function(req, res) {
      req.logout(function(err) {
        if (err) {
          // Handle the error
          return res.redirect('/'); // Or any other appropriate action
        }
        
        // Logout successful
        res.redirect('/login'); // Redirect to the login page
      });
    });

    app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
      console.log(req.user)
      res.redirect('/home');
    });

    app.use('/',sitesRouter);

}

module.exports = route;