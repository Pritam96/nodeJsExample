const fs = require('fs');
const path = require('path');

const Cart = require('./cart');

const _path = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callback) => {
  fs.readFile(_path, (err, data) => {
    if (err) {
      callback([]);
    } else {
      callback(JSON.parse(data));
    }
  });
};

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    getProductsFromFile((products) => {
      // if this.id exists, that means
      // edit product request
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(_path, JSON.stringify(updatedProducts), (err) => {
          console.log(err);
        });
      } else {
        // adding new product with newly generated id
        this.id = Date.now().toString();
        products.push(this);
        fs.writeFile(_path, JSON.stringify(products), (err) => {
          console.log(err);
        });
      }
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      callback(product);
    });
  }

  static deleteByID(id) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      const updatedProducts = products.filter((prod) => prod.id !== id);
      fs.writeFile(_path, JSON.stringify(updatedProducts), (err) => {
        // delete cart item also, if same product exists on cart
        if (!err) {
          Cart.deleteById(id, product.price);
        } else {
          console.log(err);
        }
      });
    });
  }
};
