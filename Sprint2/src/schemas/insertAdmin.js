const db = require('../database/db');
const userValidation = require('../schemas/singIn.schema'); 
const bcrypt = require('bcrypt');                          


const AdminPassword = process.env.DB_MYPASSWORD;

async function Admin (name, password, email, phone, isAdmin) {
    name, password, email, phone, isAdmin  = userValidation.validateAsync();
    await db.Users.findOrCreate({
       where: {
         name: "Delilah",
         isAdmin: true
       },
       defaults: {
         name: 'Delilah', 
         password: bcrypt.hashSync(AdminPassword, 10), 
         email: 'delilah_resto@gmail.com', 
         phone: 2345673,
         isAdmin: true
       }
     })
 };
 


 module.exports = Admin();