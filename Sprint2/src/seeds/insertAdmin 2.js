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
 
 async function User (name, password, email, phone, isUser) {
  name, password, email, phone, isAdmin  = userValidation.validateAsync();
  await db.Users.findOrCreate({
     where: {
       name: "Lenny Kravitz",
       isAdmin: false
     },
     defaults: {
       name: 'Lenny Kravitz', 
       password: bcrypt.hashSync('elpapuNigga', 10), 
       email: 'lenny_music@gmail.com', 
       phone: 3569824,
       isAdmin: false
     }
   })
};


 module.exports = Admin(), User();