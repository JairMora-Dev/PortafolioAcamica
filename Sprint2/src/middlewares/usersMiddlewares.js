const db = require('../database/db');
const expressJwt = require('express-jwt');
const { Users } = require('../database/db');

const mypass = process.env.DB_MYPASSWORD

exports.expJWT = (expressJwt({
    secret: mypass,
    algorithms: ['HS256']
}));

exports.invalidToken =  ( async (err, req, res, _next) => {
    if (err.name === 'UnauthorizedError') {
        await res.status(401).json('Token invalido');
    } else {
        await res.status(500).json('Internal server error');
    }
});


exports.AdminToken = (async (req, res, next) =>{
    const { email } = req.user;
    const AdminAccess = await db.Users.findOne({
        where: {
            isAdmin: true
        }
    });  
        if( AdminAccess.email != email ){
            res.status(401).json('Usted no cuenta con credenciales de Administrador de esta app');
        }else{
            next();
        }
});

exports.NoRepeatUsers = (async (req, res, next) =>{
    email = await db.Users.email;
    const NoRepeatEmail  = await db.Users.findOne({
        where: { email: req.body.email }
    });
    
    if( email == NoRepeatEmail ){
        next();
    }else{
        res.status(400).json('El Email suministrado ya esta registrado, porfavor ingrese otro');
    }
});

