const express = require('express');
const OrderRouter = express.Router();
const { getingUsers } = require('../models/registro.models');
const {getingOrder, OrderItems, getStatesAdminOrders, getStatesUsersOrders} = require('../models/orders.models');
const { getingProduct } = require('../models/productos.models');
const {getingPayments} = require('../models/medioPago.models');

//acceder a la lista de productos luego de logeo
/**
 * @swagger
 * /orders/products:
 *  get:
 *      summary: Obtenga todos los productos disponibles en Delilah Resto
 *      tags: [Pedidos]
 *      security: 
 *          - basicAuth: [] 
 *      responses:
 *          200:
 *              description: Lista de productos de nuestro restaurante
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/products'
 *                              
 */
OrderRouter.get('/products', (req, res) => {
    const user = req.auth.user;
    res.body = getingProduct();
    res.json(res.body);
});

//acceder con tu user y password para ver tu pedido 
/**
 * @swagger
 * /orders/seeOrder:
 *  get:
 *      summary: obtiene le pedido pendiente del usuario
 *      tags: ['Pedidos']
 *      security: 
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: Pedido para confirmar obtenido con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedidos'
 *          401:
 *              description: solo disponible para usuarios logueados
 */
OrderRouter.get('/seeOrder', (req, res) =>{
    const user = req.auth.user;
    console.log(user);
    const UserOrderName = getingOrder().find(u => u.usuario == user && u.estado == "Pendiente");
    if(UserOrderName){
    res.json(UserOrderName);
    }else{
        res.status(404).json('no se encuentra un pedido ya que no hay un usuario logueado');
    }
});

// Ruta para postear productos al pedido
/**
 * @swagger
 * 
 * /orders/newproduct/{id}:
 *  post:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto a agregar
 *        required: true
 *        type: integer
 *
 *      summary: agrega el producto solicitado al pedido pendiente del usuario logueado
 *      tags: ['Pedidos']
 *      security: 
 *          - basicAuth: [] 
 *      responses:
 *          200:
 *              description: producto agregado
 *          400:
 *              description: id no valido
 *          401:
 *              description: acceso denegado
 */
OrderRouter.post('/newproduct/:id', (req, res)=> {
    const user = req.auth.user;
    const {id} = req.params;
    const UserOrderIdproduc = getingProduct().find(u => u.id === parseInt(id));
    if (UserOrderIdproduc){
        
        const UserOrderName = getingOrder().find(u => u.usuario == user && u.estado == "Pendiente");
        UserOrderName.pedido.push(UserOrderIdproduc);

        //llenado del total de la cuenta
        const mapPrice = UserOrderName.pedido.map(p => p.price);
        let totalPrice = 0;
        for(let n of mapPrice) totalPrice+=n;
        const CostActulization = OrderItems(UserOrderName.id, totalPrice, UserOrderName.usuario, UserOrderName.direccion, UserOrderName.pedido, UserOrderName.medioPago, UserOrderName.estado);
        getingOrder().splice(getingOrder().lastIndexOf(UserOrderName), 1, CostActulization);
        //
        res.json(getingOrder().find(u => u.usuario == user && u.estado == "Pendiente"));
    }else{
        res.status(400).json('por favor ingrese un id valido')
    }
});


// User eliminar un producto del pedido user
/**
 * @swagger
 * 
 * /orders/deleteProduct/{id}:
 *  delete:
 *      parameters:
 *      - in: path
 *        name: id
 *        description: id del producto a eliminar
 *        required: true
 *        type: integer
 *
 *      summary: elimina el producto solicitado al pedido pendiente del usuario 
 *      tags: ['Pedidos']
 *      security: 
 *          - basicAuth: [] 
 *      responses:
 *          200:
 *              description: producto agregado
 *          400:
 *              description: id no valido
 *          401:
 *              description: acceso denegado
 */
OrderRouter.delete('/deleteProduct/:id', (req, res) => {
    const user = req.auth.user;
    const {id} = req.params;
    const UserOrderName = getingOrder().find(u => u.usuario == user);
    const UserOrderIdproduc = getingProduct().find(u => u.id === parseInt(id));
    UserOrderName.pedido.splice(UserOrderName.pedido.lastIndexOf(UserOrderIdproduc), 1);
    
    //llenado del total de la cuenta
    const mapPrice = UserOrderName.pedido.map(p => p.price);
    let totalPrice = 0;
    for(let n of mapPrice) totalPrice+=n;
    const CostActulization = OrderItems(UserOrderName.id, totalPrice, UserOrderName.usuario, UserOrderName.direccion, UserOrderName.pedido, UserOrderName.medioPago, UserOrderName.estado);
    getingOrder().splice(getingOrder().lastIndexOf(UserOrderName), 1, CostActulization);
    //
    res.json(getingOrder().find(u => u.usuario == user));
});

//ruta  para cambiar elegir medio de pago
/**
 * @swagger
 * /orders/selectPayment/{id}:
 *      put:
 *          parameters:
 *          - in: path
 *            name: id
 *            description: id del medio de pago a seleccionar
 *            required: true
 *            type: integer
 *          summary: Selecciona el metodo de pago de tu pedido
 *          tags: [Pedidos]
 *          security: 
 *              - basicAuth: []
 *          requestBody:
 *              required: false
 *              content:
 *                  application/text:
 *                      schema:
 *                          $ref: '#/components/schemas/mediosdepago'
 *                      type: 
 *                          Array             
 *          responses:
 *              201:
 *                  description: Medio de pago Seleccionado
 *              404:
 *                  description: El medio de pago no es valido
 */
OrderRouter.put('/selectPayment/:id', (req, res)=>{
    const Order = getingOrder().find(o => o.usuario == req.body.usuario);

    const validation = getingOrder().find(o => o.usuario === req.auth.user && o.estado == "Pendiente");
    const SelePayment = getingPayments().find(s => s.id == req.params.id);
    if (SelePayment){
        validation.medioPago = SelePayment.medioDePago;
        res.status(201).json(`El medio de pago selesccionado es: ${validation.medioPago}`);
    } else{
        res.status(404).json('el medio de pago no es valido');
    };
});



//confirmar el pedido completo user
/**
 * @swagger
 * /orders/corfirmOrder:
 *      put:
 *          summary: Envia confirmado para cerrar tu orden y comenzar la preparacion
 *          tags: [Pedidos]
 *          security: 
 *              - basicAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/confirmarPedido'
 *                      type: 
 *                          Array             
 *          responses:
 *              201:
 *                  description: 
 *              404:
 *                  description: 
 */
OrderRouter.put('/corfirmOrder/', (req, res,)=>{
    //const Order = getingOrder().find(o => o.id == parseInt(req.params.id));
    
    const validation = getingOrder().find( o => o.usuario === req.auth.user && o.estado == "Pendiente" );
    const OrderState = getStatesUsersOrders().find( s => s.estado == req.body.estado);
    if(OrderState){
        validation.estado = OrderState.estado;
        res.status(201).json(`A puesto el estado de su pedido en: ${validation.estado}, en breve se lo prepararemos`);
        const NOrder = OrderItems( getingOrder().length+1, 0, validation.usuario, validation.direccion,[], validation.medioPago,"Pendiente" );
        getingOrder().push(NOrder);
    }else{
        res.status(404).json("Para confirmar la orden debes enviar el estado confirmado")
    }
});


//acceder al historial pedidos ya confirmados
/**
 * @swagger
 * /orders/historicOrders:
 *  get:
 *      summary: obtiene los pedidos ya confirmados del usuario
 *      tags: ['Pedidos']
 *      security: 
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: Pedido para confirmar obtenido con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedidos'
 *          401:
 *              description: solo disponible para usuarios logueados
 */
OrderRouter.get('/historicOrders', (req, res)=>{
    const Order = getingOrder().filter(o => o.usuario == req.auth.user);
    if(Order){
        res.json(Order);
    }else{
        res.status(404).json('Aun no cuentas con un historial de pedidos realizados en tu perfil, ve a productos y elige el que te guste');
    }
});


//confirma si es Admin
OrderRouter.use('/', (req, res, next) => {
    if(getingUsers().some(u => u.usuario === req.auth.user && u.isAdmin == true)){
        return next();
    }else{
        return res.status(401).json(' No estas atorizado para realizar esta accion');
    };
});

//Ruta para obtener todas las ordenes
/**
 * @swagger
 * /orders/adminallorders:
 *  get:
 *      summary: Obtiene los pedidos ya confirmados de todos los usuarios (Admin)
 *      tags: ['Pedidos']
 *      security: 
 *          - basicAuth: []
 *      responses:
 *          200:
 *              description: Pedido para confirmar obtenido con exito
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/pedidos'
 *          401:
 *              description: solo disponible para la administradora
 */
OrderRouter.get('/adminallorders', (req, res) =>{
    res.json(getingOrder());
});


//Admin cambiar el estado del pedido
/**
 * @swagger
 * /orders/changeOrderstate/{id}:
 *      put:
 *          parameters:
 *          - in: path
 *            name: id
 *            description: id del usuario que ya confirmo pedido
 *            required: true
 *            type: integer
 *          summary: Cambia los estados de pedidos ya confirmados (Admin)
 *          tags: [Pedidos]
 *          security: 
 *              - basicAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/cambiarEstadoAdmin'
 *                      type: 
 *                          Array             
 *          responses:
 *              201:
 *                  description: Pedido cambiado de estado exitosamente
 *              404:
 *                  description: Rectifique id con estado de pedido confirmado.
 */
OrderRouter.put('/changeOrderstate/:id', (req, res) => {
    const Order = getingOrder().find(o => o.id == parseInt(req.params.id) && o.estado == "Confirmado" || o.estado == "EnPreparacion" || o.estado == "Enviado" || o.estado == "Entregado");
    console.log(Order);
    const validation = getingOrder().find(o => o.usuario === req.auth.user);
    const OrderState = getStatesAdminOrders().find(o => o.estado == req.body.estado);
    console.log(OrderState);

    if(Order && validation){
        Order.estado = req.body.estado;
        res.status(201).json(Order);
    }else{
        res.status(404).json("Favor ingresar uno de los estados disponibles o rectifique que exista un estado Confirmado asociado al user elegido con el id")
    }

});







//Ruta a elegir en el $ref para medios de pago
/**
 * @swagger
 * name: estructura pedido
 * description: Estructuta para Pedidos.
 * components:
 *  schemas:
 *      pedidos:
 *          type: object
 *          required:
 *              -id
 *              -usuario
 *              -direccion
 *              -pedido
 *              -costoTotal
 *              -medioPago
 *              -estado
 *          properties:
 *              id:
 *                  type: number
 *                  description: id del medio de la orden
 *              usuario:
 *                  type: string
 *                  description: username
 *              direccion:
 *                  type: string
 *                  description: direccion del usuario
 *              pedido:
 *                  type: array
 *                  description: pedido del usuario
 *              costoTotal:
 *                  type: number
 *                  description: costo acumulado del pedido
 *              medioPago:
 *                  type: string
 *                  description: metodo de pago del pedido
 *              estado:
 *                  type: string 
 *                  description: estado del pedido
 */

//Ruta a elegir en el $ref para medios de pago
/**
 * @swagger
 * name: medios de pago
 * description: Estructuta para medios de pago.
 * components:
 *  schemas:
 *      mediosdepago:
 *          type: object
 *          required:
 *              -id
 *          properties:
 *              id:
 *                  type: number
 *                  example: IMORTANTE esto solamente es un texto guia. Seleccione el id del medio de pago que desea. 1 = efectivo, 2 = pago PSE, 3 = tarjeta NOTA Favor revisar la ruta GET/payments para observar medios de pago, pueden que hallan sido actualizados.
 *                  description: id del medio de pago
 *
 */

//Ruta a elegir en el $ref Put
/**
 * @swagger
 * name: Confirmacion pedido
 * description: Estructuta para confirmar pedido.
 * components:
 *  schemas:
 *      confirmarPedido:
 *          type: object
 *          required:
 *              -estado
 *          properties:
 *              estado:
 *                  type: string
 *                  example: Confirmado
 *                  description: estado del pedido
 * 
 */

//Ruta a elegir en el $ref Put
/**
 * @swagger
 * name: Cambiar estado del producto luego de estar confirmado
 * description: Estructuta para confirmar pedido.
 * components:
 *  schemas:
 *      cambiarEstadoAdmin:
 *          type: object
 *          required:
 *              -estado
 *          properties:             
 *              estado:
 *                  type: string
 *                  example: EnPreparacion
 *                  description: estado del pedido
 * 
 */
module.exports = OrderRouter;