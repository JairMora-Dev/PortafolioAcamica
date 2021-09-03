const db = require('../database/db');
const expressJwt = require('express-jwt');


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
            res.status(403).json('Usted no cuenta con credenciales de Administrador de esta app');
        }else{
            next();
        }
});

exports.NoRepeatUsers = (async (req, res, next) =>{
    const { email } = req.body;
    const NoRepeatEmail = await db.Users.findOne({
        where: { email }
    });
    
    if( NoRepeatEmail ){
        res.status(400).json('El Email suministrado ya esta registrado, porfavor ingrese otro');
    }else{
        next();
    }
});

exports.EmailToken = (async (req, res, next) =>{
    const token = req.user.email;
    const { email } = req.body;
    const UserEmTo = await db.Users.findOne({
        where:{
            email
        }
    });
    if (UserEmTo) {
        if (token == UserEmTo.email) {
            next();
        } else {
            res.status(401).json('Email y token no coinciden');
        }
    } else {
        res.status(400).json('El email suministrado no existe en nuestra BD');
    }
});


exports.UserStateActive = (async (req, res, next) => {
    const token = req.user.email
    const StateUser = await db.Users.findOne({
        where: {
            isActive: false,
            email: token
        }
    });

    if(!StateUser){
        next()
    }else{
        res.status(400).json('Usted por el momento esta inhabilitado');
    }
});
