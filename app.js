const express = require('express');
const bodyParser = require('body-parser');

// importing routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// creating express app
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// routing
app.use(adminRoutes);
app.use(shopRoutes);

const PORT = 4000;

// It create const server = http.createServer(app) and
// calls server.listen(PORT) automatically
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
