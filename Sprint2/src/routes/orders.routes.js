const express = require('express');
const orderRouter = express.Router();

const Order = require('../controllers/orders.controllers');
const OrderCon = require('../controllers/ordersComp.controllers');
const UMid = require('../middlewares/usersMiddlewares');

orderRouter.use('/', UMid.expJWT, UMid.invalidToken, UMid.UserStateActive);
orderRouter.use('/getAllorders', UMid.AdminToken);
orderRouter.use('/GetUserOrder', UMid.AdminToken);

orderRouter.use('/postOrder', UMid.EmailToken);
orderRouter.use('/removeProductsOrder', UMid.EmailToken);
orderRouter.use('/selectPayMeth', UMid.EmailToken);
orderRouter.use('/selectAddress', UMid.EmailToken);
orderRouter.use('/confirmOrder', UMid.EmailToken);


//Orders
orderRouter.get('/getAllorders', Order.getAll);
orderRouter.get('/getOrderofUser', Order.getOUserId);
orderRouter.post('/postOrder/:id', Order.create);
orderRouter.delete('/removeProductsOrder/:id', Order.DeleteOneProduct);

//Continue Order
orderRouter.get('/GetUserOrder/:id', OrderCon.AdmingetUserOrder);
orderRouter.put('/selectPayMeth/:id', OrderCon.Paymeth);
orderRouter.put('/selectAddress/:id', OrderCon.Address);
orderRouter.put('/confirmOrder/:id', OrderCon.ConfirmOrder);



module.exports = orderRouter