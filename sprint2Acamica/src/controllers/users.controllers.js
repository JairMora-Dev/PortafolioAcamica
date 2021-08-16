const db = require('../database/db');

exports.getAll = async (req, res) => {
    const GetUsers = await db.Users.findAll({
        include: ['orders']
    });
    res.json(GetUsers);
}

exports.create = async (req, res) => {
    const { user, name, password, email, phone, isAdmin } = req.body;
    const newUser = await db.Users.create({ user, name, password, email, phone, isAdmin });
    res.json(newUser);
};

exports.destroy = async (req, res) => {
    const { id } = req.params
    const DeleteUser = await db.Users.destroy({
        where: {
            id: id
        }
    });
    res.json(`Usuario eliminado`)
}

