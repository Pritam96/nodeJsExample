// move all product related routes here

const products = [];

exports.getAddProduct = (req, res, next) => {
  // rendering add-product.ejs file
  res.render('add-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  // adding data to the products
  products.push({ title: req.body.title });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  // rendering shop.ejs file
  res.render('shop', {
    prods: products,
    pageTitle: 'Shop',
    path: '/',
  });
};
