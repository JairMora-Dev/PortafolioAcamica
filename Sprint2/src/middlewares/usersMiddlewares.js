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
            res.status(401).json('Usted no cuenta con credenciales de Administrador de esta app');
        }else{
            next();
        }
});


