const express = require('express');
const path = require('path');

const router = express.Router();

// get request
router.get('/add-product', (req, res, next) => {
  // res.send(
  //   '<form action="/admin/add-product" method="POST"><label for="title">Product name:</label><br><input type="text" name="title" id="title"><br><label for="size">Product size:</label><br><input type="text" name="size" id="size"><br><button type="submit">Add Product</button></form>'
  // );

  res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

// post request
router.post('/add-product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
