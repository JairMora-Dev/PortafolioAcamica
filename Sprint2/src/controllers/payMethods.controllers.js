const db = require('../database/db');

exports.getAll = async (req, res) => {
    const getPayMethods = await db.PayMethods.findAll({ 
    });
    res.json(getPayMethods);
};

exports.create = async (req, res) => {
    const { payMeth } = req.body;
    const newPayMeth = await db.PayMethods.create({ 
        payMeth
    });
    res.json(newPayMeth);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { payMeth } = req.body;
    const updatePayMeth = await db.PayMethods.update({ payMeth },{
        where:{
            id
        }
    });
    res.json('Medio de Pago Actualizado');
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    const deletePayMeth = await db.PayMethods.destroy({
        where: {
            id: id 
        }
    });
};