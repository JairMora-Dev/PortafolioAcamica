const express = require('express');
const adressRouter = express.Router();

const Adress = require('../controllers/adresses.controllers');
const UMiddl = require('../middlewares/usersMiddlewares');


adressRouter.use('/', UMiddl.expJWT, UMiddl.invalidToken, UMiddl.EmailToken);


adressRouter.get('/:id', Adress.getAll);
adressRouter.post('/newAdress/', Adress.create);
adressRouter.put('/updateAdress/:id', Adress.update);
adressRouter.delete('/deleteAdress/:id', Adress.destroy);


module.exports = adressRouter;