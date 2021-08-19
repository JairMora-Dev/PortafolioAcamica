const sequelize = require('./database/db');
const express = require('express');
const db = require('./database/db')
const app = express();

//Libs para creacion por defecto del admin-------------------
const userValidation = require('./schemas/singIn.schema'); //
const bcrypt = require('bcrypt');                          //
//-----------------------------------------------------------

require('dotenv').config('../.env');
DB_MYPASSWORD = process.env.DB_MYPASSWORD
PORT = process.env.PORT || 5000;

app.use(express.json());





const userRouter = require('./routes/users.routes');
const adressRouter = require('./routes/adresses.routes')
const productRouter = require('./routes/products.routes');
const payMethodRouter = require('./routes/payMethods.routes');
const orderRouter = require('./routes/orders.routes');


app.use('/users', userRouter);
app.use('/User/adress', adressRouter);
app.use('/products', productRouter);
app.use('/pays', payMethodRouter);
app.use('/orders', orderRouter);







db.sequelize.sync({ force: false })
    .then(()=> {
        console.log('This Project is connecting to MySQL DB');
        app.listen(PORT);
        console.log('Listen Port '+ PORT);

        async function Admin (name, password, email, phone, isAdmin) {
            name, password, email, phone, isAdmin  = userValidation.validateAsync();
            await db.Users.findOrCreate({
               where: {
                 name: "Delilah",
                 isAdmin: true
               },
               defaults: {
                 name: 'Delilah', 
                 password: bcrypt.hashSync( DB_MYPASSWORD, 10), 
                 email: 'delilah_resto@gmail.com', 
                 phone: 2345673,
                 isAdmin: true
               }
             })
         };
         
         Admin();

    })
    .catch(err => {
        console.log('Error to concect to DB:' +err);
    });
 




