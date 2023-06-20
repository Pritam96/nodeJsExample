// node core modules
// const http = require('http');
const path = require('path');

// 3rd party packages
const express = require('express');
const bodyParser = require('body-parser');
// to use express-handlebars
// const expressHbs = require('express-handlebars');

//creating an express app
const app = express();

// registering new templating-engine express-handlebar
// app.engine(
//   'hbs',
//   expressHbs.engine({
//     extname: 'hbs',
//     defaultLayout: 'main-layout',
//     layoutsDir: 'views/layouts/',
//   })
// ); // any_varname, tool_name.engine()
// using handlebars as templating-engine
// app.set('view engine', 'hbs');

// we are setting a global configuration value
// we are saying to express to compile dynamic templates with pug engine
// app.set('view engine', 'pug'); // using pug as templating-engine

app.set('view engine', 'ejs'); // using ejs as templating-engine

// where we find these templates
app.set('views', 'views'); // sub-app_name, folder_name

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  // res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
  
  // rending 404.pug / .ejs file
  res.status(404).render('404', { pageTitle: 'Page Not Found', path: 'Error' });
});

const PORT = 4000;

// It calls const server = http.createServer(app) and server.listen(PORT) automatically
app.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`);
});
