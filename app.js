const http = require('http');
const express = require('express');

// creating express app
const app = express();

// adding middleware 1
app.use((req, res, next) => {
  console.log('In a middleware');
  next(); // pass on to the next middleware
});

// adding middleware 2
app.use((req, res, next) => {
  console.log('In another middleware');
  res.send('<h1>Hello from Express!</h1>');
});

const PORT = 4000;

// It create const server = http.createServer(app) and
// calls server.listen(PORT) automatically
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
