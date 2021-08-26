const { Products } = require('../database/db');
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
    const userToken = req.user.email;
    const { productId }= req.params;
    const { email } = req.body;

    const UserOrder = await db.Users.findOne({
        where: {
            email
        }
    });

    const ProductOrder = await db.Products.findOne({
        where:{
            id: productId
        }
    });

    try {
        if( userToken != UserOrder.email ){
            res.status(401).json('Mi socio su token paila');
        }else{
            
            
        const newOrder = await db.Orders.findOne({
                where:{
                    userId: UserOrder.id
                }
            });
        await newOrder.addProducts(ProductOrder.id, { through: { selfGranted: false } }) 
        await db.Orders.findOrCreate({
            where: {
                stateOrder: 'pendiente'
            },
            default: {
                newOrder
            }
        });
        
        const result = await db.Orders.findOne({
               where:{
                    id: newOrder.id
               },
               include:['products']
           });
           res.status(200).json(result);
        }
    } catch (error) {
        res.status(401).json('Mi socio su token paila desde catch');
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

