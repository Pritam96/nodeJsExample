const fs = require('fs');
const path = require('path');

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
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    this.id = Date.now().toString();
    getProductsFromFile((products) => {
      products.push(this);
      fs.writeFile(_path, JSON.stringify(products), (err) => {
        console.log(err);
      });
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findByID(id, callback) {
    getProductsFromFile((products) => {
      const product = products.find((prod) => prod.id === id);
      callback(product);
    });
  }
};
