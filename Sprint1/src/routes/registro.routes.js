const express = require('express');
const RegisRouter = express.Router();
const {getingUsers, newUsers}= require('../models/registro.models');
const {getingOrder, newOrder} = require('../models/orders.models');


//registro con requerimientos
/**
 * @swagger
 * /singup:
 *      post:
 *          summary: realice registro en Delilah Resto para acceder a nuestros productos
 *          tags: [Cuenta]
 *          security: []
 *          responses:
 *                  201:
 *                      description: 
 *                  401:
 *                      description: 
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/login'
 *                      type: 
 *                          Array            
 *              
 */
RegisRouter.post('/', (req, res) => {
    //creacion de usuario con la condicion de que no existan emails repetidos en el array
    const id = getingUsers().length+1;    
    const {usuario, nombre, password, email, direccion, telefono} = req.body;
    const findEmail = getingUsers().find(u => u.email === email);
    
        if(usuario && nombre && password && email && direccion && telefono){
            if(findEmail !== email.value){
                res.status(404).json('el email suministrado ya existe, ingrese otro')
            }else{
                newUsers({
                    id: id,
                    usuario: usuario,
                    nombre: nombre,
                    password: password,
                    email: email,
                    direccion: direccion,
                    telefono: telefono,
                    isAdmin: false});

                    const IdOrder = getingOrder().length+1;
                    newOrder({
                        id: IdOrder,
                        usuario: usuario,
                        direccion: direccion,
                        pedido:[],  
                        costoTotal: 0,
                        medioPago: "efectivo", 
                        estado: "Pendiente" 
                    });
                    //newOrder(orderUser);

                //const Nuser = newUsers(req.body);
                res.json(`Usuario ${req.body.nombre} creado exitosamente `);
            };
        }else{
            res.json('No se creo exitosamente su cuenta, favor llene todos los requirimientos');  
        };
    });


/**
 * @swagger
 * /singup/logIn:
 *  post:
 *      summary: loguea un usuario creado y da a conocer su id
 *      tags: [Cuenta]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/login1'
 *      responses:
 *          201:
 *              description: Usuario creado
 *          400: 
 *              description: Entradas inválidas
 *          401:
 *              description: usuario y contrasena incorrectos
 */

RegisRouter.post('/logIn', (req, res) => {
    const { email , password } = req.body;
    if (email && password){
        const user = getingUsers().find(r => r.email == req.body.email && r.password == req.body.password);
        if (user){
            console.log(user.nombre);
            res.status(201).json(`Bienvenido ${user.nombre} tu id en Delilah Resto es: ${user.id}`);
        }else{
            res.status(400).json(`Usuario desconocido`);
        }
    }else {
        res.status(401).json(`Debes ingresar el Email y el password correctamente para loguearte`);
    }
});


//referencia $ref
/**
 * @swagger
 * name: Usuarios
 * description: User CRUD, signup and login.
 * components:
 *  schemas:
 *      login:
 *          type: object
 *          required:
 *              -usuario
 *              -nombre
 *              -password
 *              -email
 *              -direccion
 *              -telefono
 *          properties:
 *              usuario:
 *                  type: string
 *                  example: JayM7
 *                  description: nombre unico usuario
 *              nombre:
 *                  type: string
 *                  example: Jay Anderson Park
 *                  description: nombre de usuario
 *              password: 
 *                  type: string
 *                  example: 01234
 *                  description: contrasenia
 *              email:
 *                  type: string
 *                  example: jay_s@gmail.com
 *                  description: email del usuario
 *              direccion:
 *                  type: string
 *                  example: Call 134 No 13 -12
 *                  description: dir del usuario
 *              telefono:
 *                  type: number
 *                  example: 2345445
 *                  description: num del usuario
 * 
 */

// ruta para loguearse
/**
 * @swagger 
 * tags: 
 *  name : 'Cuenta'
 *  description: 'inicio de sesión'
 * 
 * components:
 *  schemas:
 *      login1:
 *          type: object
 *          required:
 *               -email
 *               -password
 *          properties:
 *              email:
 *                  type: string
 *                  example: jay_s@gmail.com
 *                  description: email del usuario
 *              password:
 *                  type: string
 *                  example: 01234
 *                  description: contrasenia
 *      productResponse:
 *          type: object
 *          required:
 *               -email
 *               -password
 *          properties:
 *               email:
 *                  type: string
 *                  example: jay_s@gmail.com
 *                  description: email del usuario
 *               password:
 *                  type: string
 *                  example: 01234
 *                  description: contrasenia
 *                  
 */

module.exports = RegisRouter;