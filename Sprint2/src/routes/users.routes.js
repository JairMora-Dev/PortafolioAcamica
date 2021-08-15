const express = require('express');
const userRouter = express.Router();

const User = require('../controllers/users.controllers');

userRouter.get('/', User.getAll);
userRouter.post('/register', User.create);
//userRouter.put('/updateUser', User.update);
userRouter.delete('/removeUser/:id', User.destroy);


module.exports = userRouter
