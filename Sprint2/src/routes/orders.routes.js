const express = require('express');
const orderRouter = express.Router();

const Order = require('../controllers/orders.controllers');
const UMid = require('../middlewares/usersMiddlewares');

orderRouter.use('/', UMid.expJWT, UMid.invalidToken, UMid.EmailToken);
orderRouter.use('/getAllorders', UMid.expJWT, UMid.invalidToken, UMid.EmailToken, UMid.AdminToken);




orderRouter.get('/getAllorders', Order.getAll);
orderRouter.get('/getOrderofUser', Order.getOUserId);
orderRouter.post('/postOrder/:id', Order.create);
orderRouter.delete('/removeProductsOrder/:id', Order.DeleteOneProduct);
//orderRouter.put('/updateOrder', Order.update);




module.exports = orderRouter