const morgan = require('morgan');
const engine = require('express-handlebars').engine;
const express = require('express');
const path = require("path");
const fileUpload = require('express-fileupload');
const route = require("./routes");
const db = require("./config/db/index");
const session = require('express-session');  // session middleware
const passport = require('passport');  // authentication
const connectEnsureLogin = require('connect-ensure-login'); //authorization
const User = require('./app/models/Users');
const moment = require('moment');

const app = express();
// const port = 3000;

app.use(fileUpload());

app.use(morgan('combined'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.use(session({
  secret: 'r8q,+&1LM3)CD*zAGpx1xm{NeQhc;#',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport Local Strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

db.connect().catch(console.dir);

app.engine('.hbs', engine({
  extname: '.hbs',
  helpers:{
    sum: (a,b) => a + b,
    dec: (a,b) => a - b,
    isEqual: function (value1, value2, options) {
      return value1 === value2;
    },
    contains: function (value, substring, options) {
      if (value && value.trim().includes(substring)) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    formatDate: function (timestamp) {
      const formattedDate = moment(timestamp).format('DD MMMM YYYY, HH:mm');
      return formattedDate;
    },
  }
}));
app.set('view engine', '.hbs');
app.use(express.static('public'));
app.set('views', path.join(__dirname, "resources/views"));
// app.set('views', './resources/views');


//Route inits
route(app);

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log('Server is running at ' + port);
});