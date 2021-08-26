const { Products, Orders } = require('../database/db');
const db = require('../database/db');

exports.getAll = async (req, res) => {
    try {
        const GetOrders = await db.Orders.findAll({
            include: ['products']
        });
        res.json(GetOrders);
    } catch (error) {
        res.status(400).json(error);
    }

};

//incorporar un producto a la orden
exports.create = async (req, res) => {
    const { productId }= req.params;

    const ProductOrder = await db.Products.findOne({
        where:{
            id: productId
        }
    });

    try {
        res.json('hola try')
    } catch (error) {
        res.status(500).json(error);
    }
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

