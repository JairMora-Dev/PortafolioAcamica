const sequelize = require('./database/db');
const express = require('express');
const db = require('./database/db')
const app = express();


require('dotenv').config('../.env');

PORT = process.env.PORT || 5000;

app.use(express.json());





db.sequelize.sync({ force: false })
    .then(()=> {
        console.log('This Project connect to MySQL DB');
        app.listen(PORT);
        console.log('Listen Port '+ PORT);
    })
    .catch(err=> {
        console.log('Erro concect to DB:' +err);
    });
 




