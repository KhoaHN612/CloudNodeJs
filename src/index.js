const morgan = require('morgan')
const engine = require('express-handlebars').engine
const express = require('express')
const path = require("path");
const app = express()
const port = 3000

app.use(morgan('combined'))
app.use(express.static(__dirname + "/public"));

app.engine('.hbs', engine({extname: '.hbs'}));
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, "resources/views"));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})