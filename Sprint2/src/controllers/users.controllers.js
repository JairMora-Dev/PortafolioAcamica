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
            isAdmin
        } = await db.Users.findOne({ 
            where:{ email }
        });

        const responseLogIn = bcrypt.compareSync(password, userPassword);
        if ( responseLogIn ) {
            const token = jsonwebtoken.sign({
                email,
                isAdmin 
            }, mySuperPassWord);
            res.json( 'All in orden your income token is: ' + token );
        } else {
            res.status(404).json('Unathorized desde user.controllers');
        }
    } catch (error) {
        res.status(404).json(error);
    }
};

exports.ActiveSateupdate = async (req, res) => {

    const { id } = req.params;
    const { isActive } = req.body;
    const findId = await db.Users.findOne({
        where: {
            id
        }
    });
    if (findId){
        const updateStateUser = await db.Users.update({ isActive },{
            where: {
                id
            }
        });
        res.status(200).json(`Usuario ${findId.name} actualizado, ahora su isActive esta: ${isActive}`);

    }else{
        res.status(404).json('Porfavor verifique el el id del usuario a actualizar existe en nuestra BD');
    }
};


exports.getAll = async (req, res) => {
    const GetUsers = await db.Users.findAll({
        include: ['orders', 'addresses']
    });
    res.json(GetUsers);
};
