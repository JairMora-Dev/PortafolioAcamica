const db = require('../database/db');

exports.getAll = async (req, res) => {
    const GetAdress = await db.Addresses.findAll({
    });
    res.json(GetAdress);
};

exports.create = async (req, res) => {
    const { place } = req.body;
    const newPlace = await db.States.create({
        place
    });
    res.json(newPlace);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { place } = req.body;
    const updateAdress = await db.Addresses.update({ place }, {
        where: {
            id
        }
    });
    res.json('Su direccion a sido actualizada');
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    const deleteAdress = await db.Addresses.destroy({
        where: {
            id: id
        }
    });
};
