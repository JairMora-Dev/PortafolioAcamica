const sequelize = require('./database/db');
const express = require('express');
const helmet = require('helmet');
const db = require('./database/db')
const app = express();


require('dotenv').config('../.env');
PORT = process.env.PORT || 5000;

app.use(helmet())
app.use(express.json());


const userRouter = require('./routes/users.routes');
const adressRouter = require('./routes/adresses.routes');
const productRouter = require('./routes/products.routes');
const payMethodRouter = require('./routes/payMethods.routes');
const orderRouter = require('./routes/orders.routes');




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

        async function insertAdmin( Admin ) {
            Admin = await require('./seeds/insertAdmin');
        }
        insertAdmin();  //Generacion ADMIN  y user 

    })
    .catch(err => {
        console.log('Error to concect to DB:' +err);
    });
 

module.exports = app;




