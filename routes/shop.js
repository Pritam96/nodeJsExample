const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

// get request
router.get('/', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

router.get('/contactus', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contact-us.html'));
});

router.post('/success', (req, res, next) => {
  res.sendFile(path.join(rootDir, 'views', 'contact-success.html'));
});
module.exports = router;
