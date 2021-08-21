const express = require('express');
const orderRouter = express.Router();

const Order = require('../controllers/orders.controllers');
const usersMiddleware = require('../middlewares/usersMiddlewares');

orderRouter.use('/postOrder', usersMiddleware.expJWT, usersMiddleware.invalidToken);

orderRouter.get('/', Order.getAll);
orderRouter.post('/postOrder/:id', Order.create);
orderRouter.put('/updateOrder', Order.update);
orderRouter.delete('/removeOrder/:id', Order.destroy);



module.exports = orderRouter