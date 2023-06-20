const express = require('express');
const path = require('path');

const rootDir = require('../util/path');

const router = express.Router();

const products = [];

//GET => admin/add-product
router.get('/add-product', (req, res, next) => {
  // rendering add-product.ejs file
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
});

//POST => admin/add-product
router.post('/add-product', (req, res, next) => {
  // adding data to the products
  products.push({ title: req.body.title });
  res.redirect('/');
});

// module.exports = router;
exports.routes = router;
exports.products = products;
