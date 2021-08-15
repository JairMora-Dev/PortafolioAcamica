const sequelize = require('./database/db');
const express = require('express');
const app = express();

require('dotenv').config('../.env');

PORT = process.env.PORT || 5000;

app.use(express.json());







app.listen(PORT, () => {
    console.log(`Listen the port: ${PORT}`);
})




