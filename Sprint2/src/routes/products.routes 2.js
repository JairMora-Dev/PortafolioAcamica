const express = require('express');
const productRouter = express.Router();


const Product = require('../controllers/products.controllers');
const UMidd = require('../middlewares/usersMiddlewares');
const Cache = require('../middlewares/cache');

productRouter.use('/', UMidd.expJWT, UMidd.invalidToken, UMidd.UserStateActive);
productRouter.use('/getAllProducts', UMidd.expJWT, UMidd.invalidToken);
productRouter.use('/postProduct', UMidd.AdminToken, UMidd.EmailToken);
productRouter.use('/updateProduct', UMidd.AdminToken, UMidd.EmailToken);
productRouter.use('/removeProduct', UMidd.AdminToken, UMidd.EmailToken);

/**
 * @swagger
 * /products/getAllProducts:
 *  get:
 *      summary: Obtener todos productos del sistema
 *      tags: [Products]
 *      responses:
 *          200:
 *              description: Lista de productos en el sistema
 *          400:
 *              description: error catch                                                        
 */
productRouter.get('/getAllProducts', Product.getAll, Cache.CacheProducts);

/**
 * @swagger
 * /products/postProduct:
 *  post:
 *      summary: ADMIN Crea un nuevo producto en el sistema
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postProducts'
 *      responses:
 *          200:
 *              description: producto creado.
 *          400: 
 *              description: error catch.
 *          403:
 *              description: usted no cuenta con permisos ADMIN.
 */
productRouter.post('/postProduct', Product.create, Cache.CacheProducts);

/**
 * @swagger
 * /products/updateProduct/{id}:
 *  put:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del producto a actualizar
 *             required: true
 *             type: integer
 * 
 *      summary: ADMIN accion para actualizar un producto
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/postProducts'
 *      responses:
 *          200:
 *              description: El producto ha sido modificado
 *          400:
 *              description: El id del producto a actualizar no existe, por favor verifique su solicitud
 *      
 */
productRouter.put('/updateProduct/:id', Product.update, Cache.CacheProducts);

/**
 * @swagger
 * /products/removeProduct/{id}:
 *  delete:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del producto a actualizar
 *             required: true
 *             type: integer
 * 
 *      summary: ADMIN accion para eliminar un producto
 *      tags: [Products]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/allProducts'
 *      responses:
 *          200:
 *              description: El producto ha sido eliminado
 *          400:
 *              description: El id del producto a eliminar no existe, por favor verifique su solicitud
 *      
 */
productRouter.delete('/removeProduct/:id', Product.destroy, Cache.CacheProducts);



/**
 * @swagger 
 * tags: 
 *  name : 'Products'
 *  description: 'CRUD para productos en Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      allProducts: 
 *          type: object
 *          required:
 *               -email
 *          properties:
 *              email:
 *                  type: string
 *                  example: delilah_resto@gmail.com
 *                  description: email del ADMIN
 *                  $ref: '#/components/schemas/allProducts'
 */

/**
 * @swagger 
 * tags: 
 *  name : 'Products'
 *  description: 'CRUD para productos en Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      postProducts: 
 *          type: object
 *          required:
 *               -email
 *               -productName
 *               -price
 *          properties:
 *              email:
 *                  type: string
 *                  example: delilah_resto@gmail.com
 *                  description: email del ADMIN
 *              productName: 
 *                  type: string
 *                  example: Agua mineral
 *                  description: nombre producto 
 *              price: 
 *                  type: number
 *                  example: 40
 *                  description: precio producto
 *                  $ref: '#/components/schemas/postProducts'                 
 */

module.exports = productRouter
