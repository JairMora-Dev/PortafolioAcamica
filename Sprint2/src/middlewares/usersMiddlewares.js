const db = require('../database/db');
const expressJwt = require('express-jwt');
const bcrypt = require('bcrypt');

const mypass = process.env.DB_MYPASSWORD

// exports.noAdmin = ( async (req, res, next ) =>{
//     const { paswword:mypass  } = await db.Users.findOne({
//         where:{
//             isAdmin: true
//         }
//     });
//     const result = bcrypt.compareSync(paswword, mypass)
//     if(result){
//         next();
//     }else{
//         res.status(404).json('Unauthorized user middleware');
//     }
// });

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



