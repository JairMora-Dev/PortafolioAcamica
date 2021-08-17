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
db.Orders = require('../models/orders.models')(sequelize, DataTypes);
db.PayMethods = require('../models/payMeth.models')(sequelize, DataTypes);

//SubModels
db.Addresses = require('../models/adresses.models')(sequelize, DataTypes);

//BD_USERS
db.Users.hasMany(db.Orders);
db.Orders.belongsTo(db.Users);

db.Users.hasMany(db.Addresses);
db.Addresses.belongsTo(db.Users);

//BD_ORDERS
db.Products.belongsToMany(db.Orders, { through: 'Products_Orders' });
db.Orders.belongsToMany(db.Products, { through: 'Products_Orders' });


db.PayMethods.hasOne(db.Orders);
db.Orders.belongsTo(db.PayMethods);


module.exports = db;






