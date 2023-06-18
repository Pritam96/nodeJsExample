const express = require('express');
const path = require('path');

const router = express.Router();

// get request
router.get('/', (req, res, next) => {
  // res.send('<h1>Hello from Express!</h1>');
  res.sendFile(path.join(__dirname, '..', 'views', 'shop.html'));
});

module.exports = router;
