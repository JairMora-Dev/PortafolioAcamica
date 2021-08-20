const express = require('express');
const userRouter = express.Router();

const User = require('../controllers/users.controllers');
const middlewareU = require('../middlewares/usersMiddlewares')

userRouter.use('/removeUser', middlewareU.expJWT, middlewareU.invalidToken, middlewareU.AdminToken );

userRouter.get('/', User.getAll);
userRouter.post('/register', User.create);
userRouter.post('/logIn', User.createLogIn);
//userRouter.put('/updateUser', User.update);
userRouter.delete('/removeUser/:id', User.destroy);





module.exports = userRouter;
