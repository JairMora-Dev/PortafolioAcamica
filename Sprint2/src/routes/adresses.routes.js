const express = require('express');
const adressRouter = express.Router();

const Adress = require('../controllers/adresses.controllers');

adressRouter.get('/', Adress.getAll);
adressRouter.post('/newAdress', Adress.create);
adressRouter.put('/updateAdress', Adress.update);
adressRouter.delete('/deleteAdress', Adress.destroy);


module.exports = adressRouter;