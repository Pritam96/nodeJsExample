const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editMode: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  // creating new product entry id=null
  const product = new Product(null, title, imageUrl, description, price);
  product
    .save()
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([products]) => {
      res.render('admin/products', {
        products: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit; // edit-product/1687356579284?edit=true
  if (!editMode) {
    return redirect('/');
  }
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) return redirect('/');
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      product: product,
      editMode: editMode,
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedPrice = req.body.price;
  const updatedDescription = req.body.description;

  // updating an existing product entry, we send productId
  // sequence: constructor(id, title, imageUrl, description, price)
  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice
  );
  updatedProduct.save();
  res.redirect('/admin/products');
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteByID(productId)
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => console.log(err));
};
