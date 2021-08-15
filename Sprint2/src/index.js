const sequelize = require('./database/db');
const express = require('express');
const db = require('./database/db')
const app = express();


require('dotenv').config('../.env');
PORT = process.env.PORT || 5000;

app.use(express.json());





const userRouter = require('./routes/users.routes');
const productRouter = require('./routes/products.routes');
const orderRouter = require('./routes/orders.routes');

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/orders', orderRouter);











db.sequelize.sync({ force: false })
    .then(()=> {
        console.log('This Project is connecting to MySQL DB');
        app.listen(PORT);
        console.log('Listen Port '+ PORT);
    })
    .catch(err => {
        console.log('Error to concect to DB:' +err);
    });
 




