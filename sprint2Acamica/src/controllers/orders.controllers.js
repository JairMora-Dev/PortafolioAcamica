const db = require('../database/db');

exports.getAll = async (req, res) => {
    const GetOrders = await db.Orders.findAll({
        include: ['products']
    });
    res.json(GetOrders);
}



