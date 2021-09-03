const express = require('express');
const payRoutes = express.Router();


const PayMethod = require('../controllers/payMethods.controllers');
const UMidd = require('../middlewares/usersMiddlewares');

payRoutes.use('/', UMidd.expJWT, UMidd.invalidToken);
payRoutes.use('/getPayMeth', UMidd.expJWT, UMidd.invalidToken );
payRoutes.use('/newPayMeth', UMidd.AdminToken, UMidd.EmailToken);
payRoutes.use('/updatePayMeth', UMidd.AdminToken, UMidd.EmailToken);
payRoutes.use('/deletePayMeth', UMidd.AdminToken, UMidd.EmailToken);


/**
 * @swagger
 * /pays/getPayMeth:
 *  get:
 *      summary: Obtener todos medios de pago del sistema
 *      tags: [Pay Methods]
 *      responses:
 *          200:
 *              description: Lista de medios de pago en el sistema
 *          400:
 *              description: error catch                                                        
 */
payRoutes.get('/getPayMeth', PayMethod.getAll);

/**
 * @swagger
 * /pays/newPayMeth:
 *  post:
 *      summary: ADMIN Crea un nuevo metodo de pago en el sistema
 *      tags: [Pay Methods]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postPayMeth'
 *      responses:
 *          200:
 *              description: medio de pago creado.
 *          400: 
 *              description: error catch.
 *          403:
 *              description: usted no cuenta con permisos ADMIN.
 */
payRoutes.post('/newPayMeth', PayMethod.create);

/**
 * @swagger
 * /pays/updatePayMeth/{id}:
 *  put:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del metodo de pago a actualizar
 *             required: true
 *             type: integer
 * 
 *      summary: ADMIN accion para actualizar un medio de pago
 *      tags: [Pay Methods]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postPayMeth'
 *      responses:
 *          200:
 *              description: El medio de pago a sido modificado
 *          400:
 *              description: El id del medio de pago a actualizar no existe, por favor verifique su solicitud
 *      
 */
payRoutes.put('/updatePayMeth/:id', PayMethod.update);

/**
 * @swagger
 * /pays/deletePayMeth/{id}:
 *  delete:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del metodo de pago a actualizar
 *             required: true
 *             type: integer
 * 
 *      summary: ADMIN accion para eliminar un medio de pago
 *      tags: [Pay Methods]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/delPayMeth'
 *      responses:
 *          200:
 *              description: El medio de pago sido eliminado
 *          400:
 *              description: El id del medio de pego a eliminar no existe, por favor verifique su solicitud
 *      
 */
payRoutes.delete('/deletePayMeth/:id', PayMethod.destroy);


/**
 * @swagger 
 * tags: 
 *  name : 'Pay Methods'
 *  description: 'CRUD para metodos de pago en Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      postPayMeth: 
 *          type: object
 *          required:
 *               -email
 *               -NamePay
 *          properties:
 *              email:
 *                  type: string
 *                  example: delilah_resto@gmail.com
 *                  description: email del ADMIN
 *              NamePay: 
 *                  type: string
 *                  example: Pago Nequi
 *                  description: nombre metodo de pago
 *                  $ref: '#/components/schemas/postPayMeth'               
 */

/**
 * @swagger 
 * tags: 
 *  name : 'Pay Methods'
 *  description: 'CRUD para metodos de pago en Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      delPayMeth: 
 *          type: object
 *          required:
 *               -email
 *          properties:
 *              email:
 *                  type: string
 *                  example: delilah_resto@gmail.com
 *                  description: email del ADMIN
 *                  $ref: '#/components/schemas/delPayMeth'               
 */


module.exports = payRoutes;