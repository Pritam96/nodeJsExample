const fs = require('fs');
const path = require('path');

// creating a path
const _path = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // fetching the previous cart
    fs.readFile(_path, (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }
      // Analyze the cart and find existing product
      const existingProductIndex = cart.products.findIndex(
        (product) => product.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product & increase quantity
      if (existingProduct) {
        // add existing product to new object updatedProduct
        updatedProduct = { ...existingProduct };
        updatedProduct.qty += 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice += +productPrice;

      // write to the file
      fs.writeFile(_path, JSON.stringify(cart), (err) => console.log(err));
    });
  }

  static deleteById(id, productPrice) {
    // fetching the previous cart
    fs.readFile(_path, (err, data) => {
      if (err) return;
      const cart = JSON.parse(data);
      const updatedCart = { ...cart };
      const product = updatedCart.products.find((product) => product.id === id);
      if (!product) return; // not having any product
      updatedCart.totalPrice =
        updatedCart.totalPrice - productPrice * product.qty;
      updatedCart.products = updatedCart.products.filter(
        (product) => product.id !== id
      );
      // write to the file
      fs.writeFile(_path, JSON.stringify(updatedCart), (err) =>
        console.log(err)
      );
    });
  }

  static getProducts(callback) {
    fs.readFile(_path, (err, data) => {
      if (!err) {
        const cart = JSON.parse(data);
        callback(cart);
      }
    });
  }
};
