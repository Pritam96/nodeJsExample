const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

// importing routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const rootDir = require('./util/path');

// creating express app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// static path added
app.use(express.static(path.join(rootDir, 'public')));

// routing
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// response 404
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

const PORT = 4000;

// It create const server = http.createServer(app) and
// calls server.listen(PORT) automatically
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
