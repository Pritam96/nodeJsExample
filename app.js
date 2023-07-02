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
const Product = require('./models/product');
const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// creating a new middleware
// manually setting req.user
// req.user saved as a sequelize object
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// A Product is created by a User
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
// A User can create multiple Product
User.hasMany(Product);

sequelize
  // .sync({ force: true })
  .sync()
  .then((result) => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: 'Pritam', email: 'pritam@example.com' });
    }
    return user;
  })
  .then((user) => {
    app.listen(4000);
  })
  .catch((err) => console.log(err));
