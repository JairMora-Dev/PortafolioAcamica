const express = require('express');
const orderRouter = express.Router();

const Order = require('../controllers/orders.controllers');

orderRouter.get('/', Order.getAll);
//orderRouter.post('/postOrder', Order.create);
//orderRouter.put('/updateOrder', Order,update);
//orderRouter.delete('/removeOrder/:id', Order.destroy);



module.exports = orderRouter