const express = require('express');
const ProRouter = express.Router();
const {getingProduct, newProduct} = require('../models/productos.models'); 
const { getingUsers } = require('../models/registro.models');


const products = getingProduct();

//obtener productos users
/**
 * @swagger
 * /products:
 *  get:
 *      summary: Obtener todos los productos de su sistema
 *      tags: [Productos]
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
 *                              $ref: '#/components/schemas/products'
 *                              
 */
ProRouter.get('/', (req, res) =>{
    res.json(getingProduct());
    console.log(`Bienvenido estimad@ admin, hasta el momento tiene ${getingProduct().length} productos registrados`);
});

ProRouter.get('/:id', (req, res) => {
    const {id} = req.params;
    const filtro = getingProduct().find(u => u.id == id)
    res.json(filtro)
});

ProRouter.use('/', (req,res,next) =>{
    if (getingUsers().some(u => u.usuario === req.auth.user && u.isAdmin == true)== false) 
    {return res.status(401).json('No está autorizado')}
    else {return next()}
});

//registro con requerimientos
/**
 * @swagger
 * /products:
 *      post:
 *          summary: agregar un producto nuevo a tu sistema (Admin)
 *          tags: [Productos]
 *          security: 
 *              - basicAuth: [] 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/products'
 *                      type: 
 *                          Array
 *          responses:
 *                  201:
 *                      description: producto creado exitosamente
 *                  401:
 *                      description: no esta autorizado, no eres Admin.   
 *          
 */        
ProRouter.post('/', (req, res) => {
    const id = getingProduct()[getingProduct().length-1].id+1;
    const {productName, price} = req.body;

    if(productName && price){
        const Nproduc = {id:id, productName:req.body.productName, price:req.body.price};
        newProduct(Nproduc);
        res.json(Nproduc);
    }else{
        res.json('No se creo exitosamente su producto nuevo');
    };
});

/**
 * @swagger
 * /products/{id}:
 *      put:
 *          parameters:
 *          - in: path
 *            name: id
 *            description: id del producto a actualizar
 *            required: true
 *            type: integer
 *          summary: Actualiza un producto a tu sistema (Admin)
 *          tags: [Productos]
 *          security: 
 *              - basicAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/productsAct'
 *                      type: 
 *                          Array             
 *          responses:
 *              201:
 *                  description: Producto actualizado
 *              401:
 *                  description: usuario y contrasenia no eres Admin
 */
ProRouter.put('/:id', (req, res)=> {
    const {id} = req.params;
    const {productName, price} = req.body;
    const CheckId = getingProduct().find(u => u.id == req.params.id);
    console.log(CheckId);
    CheckId.productName=productName;
    CheckId.price=price;
    res.status(201).json(getingProduct());
    console.log('Producto exitosamente actualizado');
});

/**
 * @swagger
 * /products/{id}:
 *      delete:
 *          summary: Borra un producto existente de tu sistema (Admin)
 *          tags: [Productos]
 *          parameters:
 *          - in: path
 *            name: id
 *            description: id del producto a eliminar
 *            required: true
 *            type: integer 
 *          security: 
 *              - basicAuth: []         
 *          responses:
 *              201:
 *                  description: Producto eliminado
 *              401:
 *                  description: usuario y contrasenia incorrectos para acceder al delete de productos. No eres admin
 */
ProRouter.delete('/:id', (req, res) => {
    const IdreqParams = getingProduct().some(r => r.id === parseInt(req.params.id));
    if (IdreqParams){
        getingProduct().splice(getingProduct().lastIndexOf(getingProduct().find(r => r.id ===parseInt(req.params.id))), 1);
        res.status(201).json(getingProduct());
    }else{
        res.status(400).json('No se encontro el id del producto');
    }
});







//Ruta a elegir en el $ref
/**
 * @swagger
 * name: Productos
 * description: Estructuta para productos.
 * components:
 *  schemas:
 *      products:
 *          type: object
 *          required:
 *              -productName
 *              -price
 *          properties:
 *              productName:
 *                  type: string
 *                  example: Jugo Natural Mora
 *                  description: nombre del producto
 *              price:
 *                  type: number
 *                  example: 90
 *                  description: precio del producto
 * 
 */

//Ruta a elegir en el $ref Put
/**
 * @swagger
 * name: Productos
 * description: Estructuta para productos.
 * components:
 *  schemas:
 *      productsAct:
 *          type: object
 *          required:
 *              -productName
 *              -price
 *          properties:
 *              productName:
 *                  type: string
 *                  example: limonada
 *                  description: nombre del producto
 *              price:
 *                  type: number
 *                  example: 80
 *                  description: precio del producto
 * 
 */

module.exports = ProRouter;