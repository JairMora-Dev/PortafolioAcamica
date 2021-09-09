const express = require('express');
const orderRouter = express.Router();

const Order = require('../controllers/orders.controllers');
const OrderCon = require('../controllers/ordersComp.controllers');
const UMid = require('../middlewares/usersMiddlewares');

orderRouter.use('/', UMid.expJWT, UMid.invalidToken, UMid.UserStateActive);
orderRouter.use('/getAllorders', UMid.AdminToken);
orderRouter.use('/GetUserOrder', UMid.AdminToken);

orderRouter.use('/postOrder', UMid.EmailToken);
orderRouter.use('/removeProductsOrder', UMid.EmailToken);
orderRouter.use('/selectPayMeth', UMid.EmailToken);
orderRouter.use('/selectAddress', UMid.EmailToken);
orderRouter.use('/confirmOrder', UMid.EmailToken);
orderRouter.use('/changeStateO', UMid.AdminToken, UMid.EmailToken);

/**
 * @swagger
 * /orders/getAllorders:
 *  get:
 *      summary: ADMIN Obtener todas las ordenes del sistema
 *      tags: [Orders]
 *      responses:
 *          200:
 *              description: Lista de ordenes en el sistema
 *          400:
 *              description: error catch                                                        
 */
orderRouter.get('/getAllorders', Order.getAll);

/**
 * @swagger
 * /orders/GetUserOrder/{id}:
 *  get:
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del usuario del historial de sus ordenes
 *             required: true
 *             type: integer
 *      summary: ADMIN Obtener todas las ordenes de un usuario del sistema
 *      tags: [Orders]
 *      responses:
 *          200:
 *              description: Lista de ordenes en el sistema del usuario seleccionado
 *          400:
 *              description: error catch                                                        
 */
 orderRouter.get('/GetUserOrder/:id', OrderCon.AdmingetUserOrder);

/**
 * @swagger
 * /orders/getOrderofUser:
 *  get:
 *      summary: Observa como va tu orden en Dalilah Resto
 *      tags: [Orders]
 *      responses:
 *          200:
 *              description: Lista de productos en el sistema
 *          400:
 *              description: error catch                                                        
 */
orderRouter.get('/getOrderofUser', Order.getOUserId);

/**
 * @swagger
 * /orders/postOrder/{id}:
 *  post:
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del producto a postear en la orden
 *             required: true
 *             type: integer
 *      summary: Pon un nuevo producto en tu order
 *      tags: [Orders]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postOrders'
 *      responses:
 *          201:
 *              description: producto puesto en la orden.
 *          500: 
 *              description: error catch.
 *          400:
 *              description: el id del producto no existe en nuestra DB
 */
orderRouter.post('/postOrder/:id', Order.create);

/**
 * @swagger
 * /orders/removeProductsOrder/{id}:
 *  delete:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del producto a eliminar de la orden
 *             required: true
 *             type: integer
 * 
 *      summary: accion para eliminar un producto de tu orden actual
 *      tags: [Orders]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postOrders'
 *      responses:
 *          200:
 *              description: El producto ha sido eliminado de la orden
 *          400:
 *              description: El id del producto a eliminar no existe, por favor verifique su solicitud
 *      
 */
orderRouter.delete('/removeProductsOrder/:id', Order.DeleteOneProduct);

/**
 * @swagger
 * /orders/selectPayMeth/{id}:
 *  put:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del metodo de pago para la orden
 *             required: true
 *             type: integer
 * 
 *      summary: accion para seleccionar el metodo de pago para la orden actual
 *      tags: [Orders]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postOrders'
 *      responses:
 *          200:
 *              description: El metodo de pago ha sido seleccionado 
 *          400:
 *              description: El id del metodo de pago no existe, por favor verifique su solicitud
 *      
 */
orderRouter.put('/selectPayMeth/:id', OrderCon.Paymeth);

/**
 * @swagger
 * /orders/selectAddress/{id}:
 *  put:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id de tu direccion para la orden
 *             required: true
 *             type: integer
 * 
 *      summary: accion para seleccionar la direccion para la orden actual
 *      tags: [Orders]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postOrders'
 *      responses:
 *          200:
 *              description: Se ha seleccionado una dir para la orden
 *          400:
 *              description: El id de la dir no existe, por favor verifique su solicitud
 *      
 */
orderRouter.put('/selectAddress/:id', OrderCon.Address);

/**
 * @swagger
 * /orders/confirmOrder/{id}:
 *  put:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id de la orden a confrimar
 *             required: true
 *             type: integer
 * 
 *      summary: accion para confirmar la orden actual
 *      tags: [Orders]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postOrders'
 *      responses:
 *          200:
 *              description: Su orden ha sido confirmada
 *          400:
 *              description: El id de la orden pendiente no existe, por favor verifique su solicitud
 *      
 */
orderRouter.put('/confirmOrder/:id', OrderCon.ConfirmOrder);

/**
 * @swagger
 * /orders/changeStateO/{id}:
 *  put:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id de la orden para cambiar su estado por en preparacion, enviada o entregada
 *             required: true
 *             type: integer
 * 
 *      summary: ADMIN accion cambiar el estado de las ordenes confirmadas
 *      tags: [Orders]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/ordersAdmin2'
 *      responses:
 *          200:
 *              description: El estado de la orden a sido actualizado
 *          400:
 *              description: El id de la orden no xiste, por favor verifique su solicitud
 *      
 */
orderRouter.put('/changeStateO/:id', OrderCon.ChangeStateOr);


/**
 * @swagger 
 * tags: 
 *  name : 'Orders'
 *  description: 'CRUD para ordenes en Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      ordersAdmin: 
 *          type: object
 *          required:
 *               -email
 *          properties:
 *              email:
 *                  type: string
 *                  example: delilah_resto@gmail.com
 *                  description: email del ADMIN para gestionar ordenes
 * 
 *                  $ref: '#/components/schemas/ordersAdmin'                 
 */

/**
 * @swagger 
 * tags: 
 *  name : 'Orders'
 *  description: 'CRUD para ordenes en Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      ordersAdmin2: 
 *          type: object
 *          required:
 *               -email
 *               -stateOrder
 *          properties:
 *              email:
 *                  type: string
 *                  example: delilah_resto@gmail.com
 *                  description: email del ADMIN para gestionar ordenes
 *              stateOrder: 
 *                  type: string
 *                  example: en preparacion
 *                  description: estado de orden
 * 
 *                  $ref: '#/components/schemas/ordersAdmin2'                 
 */

/**
 * @swagger 
 * tags: 
 *  name : 'Orders'
 *  description: 'CRUD para ordenes en Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      postOrders: 
 *          type: object
 *          required:
 *               -email
 *          properties:
 *              email:
 *                  type: string
 *                  example: lenny_music@gmail.com
 *                  description: email del usuario para gestionar ordenes
 * 
 *                  $ref: '#/components/schemas/postOrders'                 
 */

module.exports = orderRouter