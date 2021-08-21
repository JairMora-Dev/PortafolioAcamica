const express = require('express');
const payRoutes = express.Router();


const PayMethod = require('../controllers/payMethods.controllers');
const UsersMiddlewares = require('../middlewares/usersMiddlewares');

payRoutes.use('/', UsersMiddlewares.expJWT, UsersMiddlewares.invalidToken );
payRoutes.use('/newPayMeth', UsersMiddlewares.expJWT, UsersMiddlewares.invalidToken, UsersMiddlewares.AdminToken);
payRoutes.use('/updatePayMeth', UsersMiddlewares.expJWT, UsersMiddlewares.invalidToken, UsersMiddlewares.AdminToken);
payRoutes.use('/deletePayMeth', UsersMiddlewares.expJWT, UsersMiddlewares.invalidToken, UsersMiddlewares.AdminToken);

payRoutes.get('/', PayMethod.getAll);
payRoutes.post('/newPayMeth', PayMethod.create);
payRoutes.put('/updatePayMeth/:id', PayMethod.update);
payRoutes.delete('/deletePayMeth/:id', PayMethod.destroy);


module.exports = payRoutes;