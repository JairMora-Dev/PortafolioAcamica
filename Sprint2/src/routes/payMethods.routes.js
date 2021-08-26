const express = require('express');
const payRoutes = express.Router();


const PayMethod = require('../controllers/payMethods.controllers');
const UMidd = require('../middlewares/usersMiddlewares');

payRoutes.use('/', UMidd.expJWT, UMidd.invalidToken, UMidd.EmailToken);
payRoutes.use('/newPayMeth', UMidd.AdminToken);
payRoutes.use('/updatePayMeth', UMidd.AdminToken);
payRoutes.use('/deletePayMeth', UMidd.AdminToken);

payRoutes.get('/', PayMethod.getAll);
payRoutes.post('/newPayMeth', PayMethod.create);
payRoutes.put('/updatePayMeth/:id', PayMethod.update);
payRoutes.delete('/deletePayMeth/:id', PayMethod.destroy);


module.exports = payRoutes;