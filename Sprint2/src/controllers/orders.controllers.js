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


exports.create = async (req, res) => {
    const { id } = req.params
    const { email, payMethodId } = req.body;
    const userToken = req.user.email;
    const UserOrder = await db.Users.findOne({ 
        //include: [ 'orders' ],
        where: {
            email
        }
    });
    const ProductsOrder = await db.Products.findOne({
        where: {
            id
        }
    });
    
    try {
        if( UserOrder.email != userToken ){
            res.status(401).json('El email enviado no corresponde al token de acceso, porfavor rectifique su solicitud');
        }else{
            const newOrder = db.Orders.create({ 
                payMethodId, 
                userId: UserOrder.id,            
            },{
                include: ['products'],
            });
        }
        res.json(newOrder);
    } catch (error) {
        res.status(400).json(error);
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

