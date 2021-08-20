const express = require('express');
const userRouter = express.Router();

const User = require('../controllers/users.controllers');
const middlewareU = require('../middlewares/usersMiddlewares')


userRouter.use('/removeUser', middlewareU.expJWT, middlewareU.invalidToken, middlewareU.AdminToken );
userRouter.use('/allUsers', middlewareU.expJWT, middlewareU.invalidToken, middlewareU.AdminToken );
userRouter.use('/updateUser', middlewareU.expJWT, middlewareU.invalidToken, middlewareU.AdminToken );

//middlewareEmail
userRouter.use('/register', middlewareU.NoRepeatUsers);

userRouter.get('/allUsers', User.getAll);
userRouter.post('/register', User.create);
userRouter.post('/logIn', User.createLogIn);
userRouter.put('/updateUser/:id', User.ActiveSateupdate);
userRouter.delete('/removeUser/:id', User.destroy);





module.exports = userRouter;
