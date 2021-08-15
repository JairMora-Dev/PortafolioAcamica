require('dotenv').config('../../.env');
const { Sequelize, DataTypes } = require('sequelize');
const { DB_HOST, DB_NAME, DB_USER,DB_PASSWORD } = process.env;


const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect:  'mysql' 
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require('../models/users.models')(sequelize, DataTypes);
db.Products = require('../models/products.models')(sequelize, DataTypes);
db.PayMethods = require('../models/payMeth.models')(sequelize, DataTypes);



module.exports = db;


//   (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('This project is connect to MySQL_DB especifically in DB called: ' + DB_NAME);
//     } catch (error) {
//         console.error('Fail conection to MySQL_DB');
//     }
// })();

// module.exports = sequelize;




