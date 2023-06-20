const express = require('express');

const path = require('path');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  const products = adminData.products;
  // rendering shop.ejs file
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
});

router.get('/contactus', (req, res, next) => {
  // rendering contact-us.ejs file
  res.render('contact-us', {
    pageTitle: 'Contact Us',
    path: '/contactus',
  });
});

router.post('/success', (req, res, next) => {
  // rendering contact-us.ejs file
  res.render('contact-success', {
    pageTitle: 'Contact Us',
    path: '/contactus',
  });
});

module.exports = router;
