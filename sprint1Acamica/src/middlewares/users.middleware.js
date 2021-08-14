//const basicAuth = require('express-basic-auth');
const {getingUsers}  = require("../models/registro.models");


const autentication = (usuario, contrasenia) => {
        const UserCheck = getingUsers().find(u => u.usuario === usuario && u.password === contrasenia);
        if(UserCheck) {return true}
        else {return false}
};



module.exports = autentication;
