const express = require('express');
const helmet = require('helmet');
const db = require('./database/db')
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const swaggerOptions = require('./utils/swaggerConf');

const environment = process.env.NODE_ENV;
const apiDescription = process.env.API_DESCRIPTION;

require('dotenv').config('../.env');
PORT = process.env.PORT || 5000;

const cspDefaults = helmet.contentSecurityPolicy.getDefaultDirectives();
delete cspDefaults['upgrade-insecure-requests'];

app.use(helmet({
    contentSecurityPolicy: { directives: cspDefaults }
}));
app.use(express.json());


const userRouter = require('./routes/users.routes');
const adressRouter = require('./routes/adresses.routes');
const productRouter = require('./routes/products.routes');
const payMethodRouter = require('./routes/payMethods.routes');
const orderRouter = require('./routes/orders.routes');
const swaggerSpecs = swaggerJsDoc(swaggerOptions);




app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));
app.use('/users', userRouter);
app.use('/adress', adressRouter);
app.use('/products', productRouter);
app.use('/pays', payMethodRouter);
app.use('/orders', orderRouter);






db.sequelize.sync({ force: false })
    .then(()=> {
        console.log('This Project is connecting to MySQL DB');
        app.listen(PORT);
        console.log('Listen Port '+ PORT);
        console.log(`La aplicacion se esta ejecutando en el ambiente: '${environment}'`);
        console.log(`Descripcion: '${apiDescription}'`);

        async function insertAdmin( Admin ) {
            Admin = await require('./seeds/insertAdmin');
        }
        insertAdmin();  //Generacion ADMIN  y user 

    })
    .catch(err => {
        console.log('Error to concect to DB:' +err);
    });
 

module.exports = app;




