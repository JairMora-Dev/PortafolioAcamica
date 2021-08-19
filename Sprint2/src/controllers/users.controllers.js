const db = require('../database/db');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const userValidation = require('../schemas/singIn.schema');
const ValidationLogIn = require('../schemas/logIn.Schema');

const mySuperPassWord = process.env.DB_MYPASSWORD;

exports.create = async (req, res) => {
    try {
        const { 
            name, 
            password, 
            email, 
            phone
            } = await userValidation.validateAsync(req.body);
        const newUser = await db.Users.create({ 
            name, 
            password: bcrypt.hashSync(password, 10), 
            email, 
            phone
        });
        res.status(200).json(newUser);
    } catch (error) {
        res.status(404).json(error);
    }
};


exports.createLogIn = async (req, res) => {
    try {
        const {
            email,
            password
        } = await ValidationLogIn.validateAsync(req.body);

        const {
            password: userPassword,
            name
        } = await db.Users.findOne({ 
            where:{ email }
        });

        const responseLogIn = bcrypt.compareSync(password, userPassword);
        if ( responseLogIn ) {
            const token = jsonwebtoken.sign({
                email,
                name
            }, mySuperPassWord);
            res.json( 'All in orden your income token is: ' + token );
        } else {
            res.status(404).json('Unathorized desde user.controllers');
        }
    } catch (error) {
        res.status(404).json(error);
    }
};


exports.destroy = async (req, res) => {
    const { id } = req.params
    const DeleteUser = await db.Users.destroy({
        where: {
            id: id
        }
    });
    res.json(`Usuario eliminado`)
};


exports.getAll = async (req, res) => {
    const GetUsers = await db.Users.findAll({
        include: ['orders']
    });
    res.json(GetUsers);
};
