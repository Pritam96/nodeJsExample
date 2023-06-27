// node core modules
const path = require('path');

// 3rd party packages
const express = require('express');
const bodyParser = require('body-parser');

//creating an express app
const app = express();

// using ejs as templating-engine
app.set('view engine', 'ejs');

// where we find these templates
app.set('views', 'views'); // sub-app_name, folder_name

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const errorController = require('./controllers/error');

// Importing connection pool
const sequelize = require('./util/database');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(4000);
  })
  .catch((err) => console.log(err));
