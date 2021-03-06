const express = require('express');
const adressRouter = express.Router();

const Adress = require('../controllers/adresses.controllers');
const UMiddl = require('../middlewares/usersMiddlewares');


adressRouter.use('/', UMiddl.expJWT, UMiddl.invalidToken, UMiddl.UserStateActive);


/**
 * @swagger
 * /adress/getUserAdress/{id}:
 *  get:
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del user para ver sus direcciones
 *             required: true
 *             type: integer
 *      summary: Obtener las direcciones del user
 *      tags: [Address]
 *      responses:
 *          200:
 *              description: Lista de direcciones de usuarios en el sistema
 *          400:
 *              description: error catch                                                        
 */
adressRouter.get('/getUserAdress/:id', Adress.getAll, UMiddl.AdminToken);

/**
 * @swagger
 * /adress/newAdress:
 *  post:
 *      summary: Crea una nueva direccion en tu perfil
 *      tags: [Address]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postAddres'
 *      responses:
 *          200:
 *              description: direccion creada.
 *          400: 
 *              description: error catch.
 */
adressRouter.post('/newAdress', Adress.create, UMiddl.EmailToken);

/**
 * @swagger
 * /adress/updateAdress/{id}:
 *  put:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id de la direccion a actualizar
 *             required: true
 *             type: integer
 * 
 *      summary: accion para actualizar una direccion de tu perfil
 *      tags: [Address]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postAddres'
 *      responses:
 *          200:
 *              description: La direccion ha sido modificada
 *          400:
 *              description: El id de la direccion a actualizar no existe, por favor verifique su solicitud
 *      
 */
adressRouter.put('/updateAdress/:id', Adress.update, UMiddl.EmailToken);

/**
 * @swagger
 * /adress/deleteAdress/{id}:
 *  delete:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id de la direccion a eliminar
 *             required: true
 *             type: integer
 * 
 *      summary: accion para eliminar una direccion de tu perfil
 *      tags: [Address]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/deleteAddr'
 *      responses:
 *          200:
 *              description: El producto ha sido eliminado
 *          400:
 *              description: El id del producto a eliminar no existe, por favor verifique su solicitud
 *      
 */
adressRouter.delete('/deleteAdress/:id', Adress.destroy, UMiddl.EmailToken);


/**
 * @swagger 
 * tags: 
 *  name : 'Address'
 *  description: 'CRUD para direcciones de usuarios en Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      deleteAddr: 
 *          type: object
 *          required:
 *               -email
 *          properties:
 *              email:
 *                  type: string
 *                  example: lenny_music@gmail.com
 *                  description: email del usuario
 *                  $ref: '#/components/schemas/deleteAddr'
 */

/**
 * @swagger 
 * tags: 
 *  name : 'Address'
 *  description: 'CRUD para direcciones de usuarios en Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      postAddres: 
 *          type: object
 *          required:
 *               -email
 *               -place
 *          properties:
 *              email:
 *                  type: string
 *                  example: lenny_music@gmail.com
 *                  description: email de user
 *              place: 
 *                  type: string
 *                  example: CRA 175 No11C-24
 *                  description: direccion del user
 *                  $ref: '#/components/schemas/postAddres'                 
 */

module.exports = adressRouter;