const express = require('express');
const productRouter = express.Router();


const Product = require('../controllers/products.controllers');
const UMidd = require('../middlewares/usersMiddlewares');
const Cache = require('../middlewares/cache');

productRouter.use('/', UMidd.expJWT, UMidd.invalidToken, UMidd.EmailToken, Cache.CacheProducts);
productRouter.use('/postProduct', UMidd.AdminToken);
productRouter.use('/updateProduct', UMidd.AdminToken);
productRouter.use('/removeProduct', UMidd.AdminToken);


productRouter.get('/', Product.getAll);
productRouter.post('/postProduct', Product.create);
productRouter.put('/updateProduct/:id', Product.update);
productRouter.delete('/removeProduct/:id', Product.destroy);



module.exports = productRouter