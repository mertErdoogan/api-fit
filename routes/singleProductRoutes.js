const express = require('express');
const router = express.Router();
const singleProductController = require('../controllers/singleProduct');

router.get('/single-product', singleProductController.getProduct);

module.exports = router;