const express = require('express');

const path = require('path');

const adminData = require('./admin');

const productsController = require('../controllers/products');
const supportController = require('../controllers/support');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/contactus', supportController.getContactUs);

router.post('/success', supportController.getContactSuccess);

module.exports = router;
