const Handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const express = require('express');
const hbs = require('express-handlebars');
const app = express();
const PORT = process.env.PORT || 5000;

const bodyParser = require('body-parser');
const path = require('path');

// DB import
const db = require('./config/database');

// test DB
db.authenticate()
  .then(() => console.log('Database authenticated and connected...'))
  .catch(err => console.log('Error: ' + err));

// middleware for handlebars
// app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.engine('handlebars', hbs.engine({
  defaultLayout: 'main',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');

// Body parser
app.use(bodyParser.urlencoded({ extended: false}));

// set static folder
app.use(express.static(path.join(__dirname, 'public')));

// loads home page
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));

// for routes: use routes/catalogs.js
app.use('/catalogs', require('./routes/catalogs'));


app.listen(PORT, console.log(`Server started on Port ${PORT}`));