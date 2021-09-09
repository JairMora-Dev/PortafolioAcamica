const express = require('express');
const PayRoutes = express.Router();
const { getingUsers } = require('../models/registro.models');
const {getingPayments, addingPayments} = require ('../models/medioPago.models');


//ruta obetner med. de pago
/**
 * @swagger
 * /payments:
 *  get:
 *      summary: Obtener todos los medios de pago disponibles en Delilah Resto
 *      tags: [Medios de Pago]
 *      security: 
 *          - basicAuth: [] 
 *      responses:
 *          200:
 *              description: Lista de medios de pago
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/mediosDePagoRef'
 *                              
 */
PayRoutes.get('/', (req,res)=>{
    res.json(getingPayments());
});

//confirma si es Admin
PayRoutes.use('/', (req, res, next) => {
    //const usuario = getingUsers().find(u => u.usuario == 'Delilah1' );
    if(getingUsers().some(u => u.isAdmin == true)){
        return next();
    }else{
        return res.status(401).json(' No estas atorizado para realizar esta accion');
    }
});

//ruta para agregar med. de pago
/**
 * @swagger
 * /payments/newPayment:
 *      post:
 *          summary: Agrega un metodo de pago a tu sistema (Admin)
 *          tags: [Medios de Pago]
 *          security: 
 *              - basicAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/mediosDePagoRef'
 *                      type: 
 *                          Array             
 *          responses:
 *              201:
 *                  description: Medio de pago Seleccionado
 *              404:
 *                  description: El medio de pago no es valido
 */
PayRoutes.post('/newPayment', (req, res) => {
    const {medioDePago} = req.body;
    if (medioDePago){
        addingPayments(medioDePago);
        res.json(getingPayments());
    }else{
        res.status(404).json('ingresa el medio de pago para confirmar');
    }
});


//ruta para actualizar med. de pago
/**
 * @swagger
 * /payments/{id}:
 *      put:
 *          parameters:
 *          - in: path
 *            name: id
 *            description: id del medio de pago a actualizar
 *            required: true
 *            type: integer
 *          summary: Agrega un metodo de pago a tu sistema (Admin)
 *          tags: [Medios de Pago]
 *          security: 
 *              - basicAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/mediosDePagoRef'
 *                      type: 
 *                          Array             
 *          responses:
 *              201:
 *                  description: Medio de pago actualizado
 *              404:
 *                  description: El id del medio de pago no es valido
 */
PayRoutes.put('/:id', (req, res)=>{ 
    const mediosDePago = getingPayments().find(m => m.id == req.params.id);
    mediosDePago.medioDePago = req.body.medioDePago;
    res.status(201).json(getingPayments());
});


//ruta para eliminar med. pago
//ruta para actualizar med. de pago
/**
 * @swagger
 * /payments/{id}:
 *      delete:
 *          parameters:
 *          - in: path
 *            name: id
 *            description: id del medio de pago a borrar
 *            required: true
 *            type: integer
 *          summary: Agrega un metodo de pago a tu sistema (Admin)
 *          tags: [Medios de Pago]
 *          security: 
 *              - basicAuth: []          
 *          responses:
 *              201:
 *                  description: Medio de pago eliminado
 *              404:
 *                  description: El id del medio de pago no es valido
 */
PayRoutes.delete('/:id', (req, res)=> {
    const IdreqParams = getingPayments().some(p => p.id === parseInt(req.params.id));
    if(IdreqParams){
        getingPayments().splice(getingPayments().lastIndexOf(getingPayments().find(r => r.id === parseInt(req.params.id))), 1);
        res.status(201).json(getingPayments());
    }else{
        res.status(404).json('el medio de pago no fue eliminado, rectifique id')
    }
});


//Ruta a elegir en el $ref para medios de pago
/**
 * @swagger
 * name: Medios de Pago
 * description: Estructuta para medios de pago.
 * components:
 *  schemas:
 *      mediosDePagoRef:
 *          type: object
 *          required:
 *              -id
 *              -medioDePago
 *          properties:
 *              medioDePago:
 *                  type: string
 *                  example: tarjeta debido
 *                  description: nombre del medio de pago a seleccionar
 * 
 */

/**
 * @swagger
 * name: Medios de Pago
 * description: Estructuta para medios de pago.
 * components:
 *  schemas:
 *      mediosDePagoRef1:
 *          type: object
 *          required:
 *              -id
 *              -medioDePago
 *          properties:
 *              id:
 *                  type: number
 *                  example: 4
 *                  description: id medio de pago
 *              medioDePago:
 *                  type: string
 *                  example: Nequi(Bancolombia)
 *                  description: nombre del medio de pago a postear
 * 
 */
module.exports = PayRoutes;