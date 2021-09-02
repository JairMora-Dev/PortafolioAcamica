const express = require('express');
const userRouter = express.Router();

const User = require('../controllers/users.controllers');
const middlewareU = require('../middlewares/usersMiddlewares')


userRouter.use('/allUsers', middlewareU.expJWT, middlewareU.invalidToken, middlewareU.AdminToken );
userRouter.use('/updateUser', middlewareU.expJWT, middlewareU.invalidToken, middlewareU.AdminToken );

//middlewareEmail
userRouter.use('/register', middlewareU.NoRepeatUsers);



/**
 * @swagger
 * /users/allUsers:
 *  get:
 *      summary: Obtener todos los usuarios resgitrados en tu sistema (Admin)
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: Lista de usuarios del sistema
 *                             
 *                              
 */
userRouter.get('/allUsers', User.getAll);

/**
 * @swagger
 * /users/register:
 *  post:
 *      summary: Crea un nuevo usuario en el sistema
 *      tags: [Users]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SingIn'
 *      responses:
 *          200:
 *              description: Usuario creado.
 *          400: 
 *              description: El email suministrado ya existe.
 *          404:
 *              description: error catch
 */
userRouter.post('/register', User.create);

/**
 * @swagger
 * /users/logIn:
 *  post:
 *      summary: Ingresa con tu correo y contraseña sistema
 *      tags: [Users]
 *      security: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/LogIn'
 *      responses:
 *          200:
 *              description: Todo en orden su token es
 *          404:
 *              description: No esta autorizado.
 */
userRouter.post('/logIn', User.createLogIn);

/**
 * @swagger
 * /users/updateUser/{id}:
 *  put:     
 *      parameters:
 *          -  in: path
 *             name: id
 *             description: id del usuario a actualizar
 *             required: true
 *             type: integer
 * 
 *      summary: ADMIN accion para suspender a un usuario
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UpdateUser'
 *      responses:
 *          200:
 *              description: El usuario ha sido modificado
 *          404:
 *              description: Por favor verifique que el id del usuario este disponible en la BD
 *      
 */
userRouter.put('/updateUser/:id', User.ActiveSateupdate);





//schemas User Swagger

// Create newUser rute 
/**
 * @swagger 
 * tags: 
 *  name : 'Users'
 *  description: 'Registro o ingreso de usuarios a Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      SingIn: 
 *          type: object
 *          required:
 *               -name
 *               -password
 *               -email
 *               -phone
 *          properties:
 *              name:
 *                  type: string
 *                  example: Lionel Messi
 *                  description: nombre unico usuario
 *              password: 
 *                  type: string
 *                  example: elMejor10
 *                  description: contrasenia
 *              email:
 *                  type: string
 *                  example: leo_messi10@gmail.com
 *                  description: email del usuario
 *              phone:
 *                  type: number
 *                  example: 2345445
 *                  description: num del usuario
 *                  $ref: '#/components/schemas/SingIn'
 */

/**
 * @swagger 
 * tags: 
 *  name : 'Users'
 *  description: 'LogIn in Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      LogIn: 
 *          type: object
 *          required:
 *               -email
 *               -password
 *          properties:
 *              email:
 *                  type: string
 *                  example: leo_messi10@gmail.com
 *                  description: email del usuario
 *              password: 
 *                  type: string
 *                  example: elMejor10
 *                  description: contrasenia
 *                  $ref: '#/components/schemas/LogIn'
 */

/**
 * @swagger 
 * tags: 
 *  name : 'Users'
 *  description: 'LogIn in Delilah Resto web'
 * 
 * components: 
 *  schemas:
 *      UpdateUser: 
 *          type: object
 *          required:
 *               -isActive
 *          properties:
 *              isActive: 
 *                  type: boolean
 *                  example: false
 *                  description: modifica el estado de un usuario
 *                  $ref: '#/components/schemas/UpdateUser'
 */


module.exports = userRouter;
