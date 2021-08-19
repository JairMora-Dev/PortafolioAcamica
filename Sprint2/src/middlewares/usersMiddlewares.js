const db = require('../database/db');
const expressJwt = require('express-jwt');

const mypass = process.env.DB_MYPASSWORD

exports.Use = (expressJwt({
    secret: mypass,
    algorithms: ['HS256']
})
);

exports.Use =  ( async (err, req, res, _next) => {
    if (err.name === 'UnauthorizedError') {
        await res.status(401).json('Token invalido');
    } else {
        await res.status(500).json('Internal server error');
    }
});

// exports.AdminMiddleware = async (req, res, next) => {
//     Authorized = await db.Users.findOne({
//         where:{
//             email: 'delilah_resto@gmail.com',
//             isAdmin: true
//         }
//     })
//     if (Authorized){next()}
//     else(res.status(404).json('Usted no puede acceder a esta ruta'))
// };