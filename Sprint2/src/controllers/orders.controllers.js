const db = require('../database/db');

exports.getAll = async (req, res) => {
    const GetOrders = await db.Orders.findAll({
        include: ['products']
    });
    res.json(GetOrders);
}

exports.create = async (req, res) => {
    const { payMethods, totalCost } = req.body;
    const newOrder = await db.Orders.create({
        payMethods,
        totalCost
    });
    res.json(newOrder);
}

