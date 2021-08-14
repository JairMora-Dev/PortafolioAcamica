//librerias a usar
const express = require('express');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const basicAuth = require('express-basic-auth');


//Acceso a requerimiento de rutas
const usersRoutes = require('./routes/usuarios.routes');
const producRoutes = require('./routes/productos.routes');
const ordersRoutes = require('./routes/pedidos.routes');
const loginRoutes = require('./routes/registro.routes');
const PayMRoutes = require('./routes/medioPago.routes');

//swagger routes
const swaggerOptions = require('./utils/swaggerOptions');
const autentication = require('./middlewares/users.middleware');
const PayRoutes = require('./routes/medioPago.routes');





const app = express();
app.use(express.json());

const swaggerSpecs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));


app.use('/singup', loginRoutes);
app.use('/payments', PayRoutes);

app.use(basicAuth({authorizer : autentication}));
app.use('/users', usersRoutes);
app.use('/products', producRoutes);
app.use('/orders', ordersRoutes);


app.listen(5000, ()=> {console.log('Escuchando el puerto 5000')});