const fs = require('fs');
const path = require('path');

const products = [];

const _path = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = (callback) => {
  fs.readFile(_path, (err, data) => {
    if (err) {
      // return [];
      return callback([]);
    }
    callback(JSON.parse(data));
  });
};

module.exports = class Product {
  constructor(title) {
    this.title = title;
  }
  save() {
    getProductsFromFile((products) => {
      products.push(this);
      // write file
      fs.writeFile(_path, JSON.stringify(products), (err) => console.log(err));
    });
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
};
