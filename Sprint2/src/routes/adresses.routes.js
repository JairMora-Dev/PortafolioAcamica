const express = require('express');
const adressRouter = express.Router();

const Adress = require('../controllers/adresses.controllers');
const UsersMiddlewares = require('../middlewares/usersMiddlewares');


adressRouter.use('/', UsersMiddlewares.expJWT, UsersMiddlewares.invalidToken);
adressRouter.use('/newAdress', UsersMiddlewares.expJWT, UsersMiddlewares.invalidToken);
adressRouter.use('/updateAdress', UsersMiddlewares.expJWT, UsersMiddlewares.invalidToken);
adressRouter.use('/deleteAdress', UsersMiddlewares.expJWT, UsersMiddlewares.invalidToken);

adressRouter.get('/:email', Adress.getAll);
adressRouter.post('/newAdress/:email', Adress.create);
adressRouter.put('/updateAdress/:id', Adress.update);
adressRouter.delete('/deleteAdress/:id', Adress.destroy);


module.exports = adressRouter;