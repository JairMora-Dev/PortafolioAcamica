const express = require('express');
const orderRouter = express.Router();

const Order = require('../controllers/orders.controllers');
const UMid = require('../middlewares/usersMiddlewares');

orderRouter.use('/', UMid.expJWT, UMid.invalidToken, UMid.EmailToken);
orderRouter.use('/getAllorders', UMid.expJWT, UMid.invalidToken, UMid.EmailToken, UMid.AdminToken);




orderRouter.get('/getAllorders', Order.getAll);
orderRouter.post('/postOrder/:productId', Order.create);
orderRouter.put('/updateOrder', Order.update);
orderRouter.delete('/removeOrder/:id', Order.destroy);



module.exports = orderRouter