const express = require('express');
const orderRouter = express.Router();

const Order = require('../controllers/orders.controllers');
const OrderCon = require('../controllers/ordersComp.controllers');
const UMid = require('../middlewares/usersMiddlewares');

orderRouter.use('/', UMid.expJWT, UMid.invalidToken, UMid.EmailToken);
orderRouter.use('/getAllorders', UMid.expJWT, UMid.invalidToken, UMid.EmailToken, UMid.AdminToken);



orderRouter.get('/getAllorders', Order.getAll);
orderRouter.get('/getOrderofUser', Order.getOUserId);
orderRouter.post('/postOrder/:id', Order.create);
orderRouter.delete('/removeProductsOrder/:id', Order.DeleteOneProduct);

//Continue Order
orderRouter.put('/selectPayMeth/:id', OrderCon.Paymeth);
orderRouter.put('/selectAddress/:id', OrderCon.Address);
// orderRouter.put('/confirmOrder', OrderCon.confirmOrder);



module.exports = orderRouter