const express = require('express');
const payRoutes = express.Router();


const PayMethod = require('../controllers/payMethods.controllers');

payRoutes.get('/', PayMethod.getAll);
payRoutes.post('/newPayMeth', PayMethod.create);
payRoutes.put('/updatePayMeth', PayMethod.update);
payRoutes.delete('/deletePayMeth', PayMethod.destroy);


module.exports = payRoutes;