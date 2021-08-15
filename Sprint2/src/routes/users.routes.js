const express = require('express');
const UserRouter = express.Router();

const User = require('../controllers/users.controllers');

UserRouter.get('/', User.getAll);
UserRouter.post('/register', User.create);
UserRouter.delete('/removeUser/:id', User.destroy);


module.exports = UserRouter
