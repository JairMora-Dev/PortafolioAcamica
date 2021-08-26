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
    const { id }= req.params;
    const { email } = req.body;
    const GetEmailUser = await db.Users.findOne({
        where:{
            email
        }
    });
    const ProductOrder = await db.Products.findOne({
        where:{
            id
        }
    });
    try {
        if (ProductOrder) {
            const NewOrder = await db.Orders.findOne({  
                where:{
                    userId: GetEmailUser.id,
                    stateOrder: 'Pendiente'
                }
            });
            if( NewOrder ){
                const agreeProduct = await db.Products.create({ 
                    productName: ProductOrder.productName,
                    price: ProductOrder.price
                });
                await NewOrder.addProducts(agreeProduct, { through: { selfGranted: false } });
                const resultIf = await db.Orders.findOne({
                    where: {
                        id: NewOrder.id
                    },
                    include:['products']
                });
                res.status(200).json(resultIf);
            }else{
                await db.Orders.create({ userId: GetEmailUser.id });
                const newProduct = await db.Products.findOne({
                    where:{
                        id: ProductOrder.id
                    }
                });
                await NewOrder.addProducts(newProduct, { through: { selfGranted: false } });
                const resultElse = await db.Orders.findOne({
                    where: {
                        id: NewOrder.id
                    },
                    include:['products']
                });
                res.status(200).json(resultElse);
            }
        } else {
            res.status(400).json('El id del producto no existe');
        }
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

