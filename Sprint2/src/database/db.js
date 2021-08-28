require('dotenv').config('../../.env');
const { Sequelize, DataTypes } = require('sequelize');


const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

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
db.Operations= require('../models/op.models')(sequelize, DataTypes);

//BD_USERS
db.Users.hasMany(db.Orders);
db.Orders.belongsTo(db.Users);

db.Users.hasMany(db.Addresses);
db.Addresses.belongsTo(db.Users);


//BD_ORDERS VS BD_Products
db.PayMethods.hasOne(db.Orders);
db.Orders.belongsTo(db.PayMethods);



db.Orders.hasMany(db.Operations);
db.Operations.belongsTo(db.Orders);

db.Products.hasMany(db.Operations);
db.Operations.belongsTo(db.Products);


module.exports = db;
