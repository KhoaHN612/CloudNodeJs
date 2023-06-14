const morgan = require('morgan');
const engine = require('express-handlebars').engine;
const express = require('express');
const path = require("path");
const route = require("./routes");
const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "resources/views"));

//Route inits
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})