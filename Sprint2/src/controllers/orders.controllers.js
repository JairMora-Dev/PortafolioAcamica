const { Products } = require('../database/db');
const db = require('../database/db');

exports.getAll = async (req, res) => {
    const GetOrders = await db.Orders.findAll({
        include: ['products']
    });
    res.json(GetOrders);
};


// exports.create = async (req, res) => {
//     const { totalCost, quantityProducts, stateOrder } = req.body;
//     const newOrder = await db.Orders.create({
//         totalCost,
//         quantityProducts,
//         stateOrder
//     });
//     res.json(newOrder);
// };

exports.create = async (req, res) => {
   
};


exports.update = async (req, res) => {
    const { id } = req.params;
    const { totalCost, quantityProducts, stateOrder } = req.body;
    const updateOrder = await db.Orders.update({
        totalCost,
        quantityProducts,
        stateOrder
    },{
        where: {
            id
        }
    });
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    const deleteOrder = await db.Orders.destroy({
        where: {
            id: id
        }
    });
};

