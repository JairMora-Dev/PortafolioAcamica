const express = require('express');
const productRouter = express.Router();

const Product = require('../controllers/products.controllers');

productRouter.get('/', Product.getAll);
productRouter.post('/postProduct', Product.create);
productRouter.put('/updateProduct/:id', Product.update);
productRouter.delete('/removeProduct/:id', Product.destroy);



module.exports = productRouter