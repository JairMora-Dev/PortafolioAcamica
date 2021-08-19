const db = require('../database/db');
const expressJwt = require('express-jwt');

const mypass = process.env.DB_MYPASSWORD

exports.expJWT = (expressJwt({
    secret: mypass,
    algorithms: ['HS256']
}).unless({
    path: ['/register', '/login'],
})
);

exports.invalidToken =  ( async (err, req, res, _next) => {
    if (err.name === 'UnauthorizedError') {
        await res.status(401).json('Token invalido');
    } else {
        await res.status(500).json('Internal server error');
    }
});

