const express = require('express');
const router = express.Router();
const {getingUsers}= require('../models/registro.models');
const {autentication} = require('../middlewares/users.middleware');



router.use('/', (req, res , next) =>{
    if (getingUsers().some(u => u.usuario === req.auth.user && u.isAdmin == true)== false) 
    return res.status(401).json('No está autorizado') 
    else return next() 
});

//obtener usuarios
/**
 * @swagger
 * /users:
 *  get:
 *      summary: Obtener todos los usuarios resgitrados en tu sistema (Admin)
 *      tags: [Cuenta]
 *      security: 
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: Lista de usuarios del sistema
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                             
 *                              
 */
router.get('/', (req, res) =>{
    res.json(getingUsers());
    console.log(`Bienvenido estimad@ admin, hasta el momento tiene ${getingUsers().length} usuarios registrados`);
});





module.exports = router;


