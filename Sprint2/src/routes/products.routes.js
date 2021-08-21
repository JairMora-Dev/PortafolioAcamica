const express = require('express');
const productRouter = express.Router();

const Product = require('../controllers/products.controllers');
const usersMiddlewares = require('../middlewares/usersMiddlewares');
const userRouter = require('./users.routes');

productRouter.use('/postProduct', usersMiddlewares.expJWT, usersMiddlewares.invalidToken, usersMiddlewares.AdminToken);
productRouter.use('/updateProduct', usersMiddlewares.expJWT, usersMiddlewares.invalidToken, usersMiddlewares.AdminToken);
productRouter.use('/removeProduct', usersMiddlewares.expJWT, usersMiddlewares.invalidToken, usersMiddlewares.AdminToken);

productRouter.use('/', usersMiddlewares.expJWT, usersMiddlewares.invalidToken);

productRouter.get('/', Product.getAll);
productRouter.post('/postProduct', Product.create);
productRouter.put('/updateProduct/:id', Product.update);
productRouter.delete('/removeProduct/:id', Product.destroy);



module.exports = productRouter