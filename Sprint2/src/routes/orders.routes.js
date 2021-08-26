const express = require('express');
const orderRouter = express.Router();

const Order = require('../controllers/orders.controllers');
const usersMiddleware = require('../middlewares/usersMiddlewares');

orderRouter.use('/getAllorders', usersMiddleware.expJWT, usersMiddleware.invalidToken, usersMiddleware.AdminToken);
orderRouter.use('/postOrder', usersMiddleware.expJWT, usersMiddleware.invalidToken);
orderRouter.use('/updateOrder', usersMiddleware.expJWT, usersMiddleware.invalidToken);



orderRouter.get('/getAllorders', Order.getAll);
orderRouter.post('/postOrder/:productId', Order.create);
orderRouter.put('/updateOrder', Order.update);
orderRouter.delete('/removeOrder/:id', Order.destroy);



module.exports = orderRouter