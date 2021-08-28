const db = require('../database/db');

exports.getAll = async (req, res) => {
    try {
        const GetAllOrders = await db.Orders.findAll({
            include: ['operations']
        });
        res.json(GetAllOrders);
    } catch (error) {
        res.status(400).json(error);
    }
};

//incorporar un producto a la orden
exports.create = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    const GetProduct = await db.Products.findOne({ where: { id } });
    const GetUser = await db.Users.findOne({ where: { email: email } });
    const GetOrder = await db.Orders.findOne({ where: { userId: GetUser.id, stateOrder: 'pendiente' } });
    
   
        if (GetProduct){
            if(!GetOrder){

                const newOrder = await db.Orders.create({ userId: GetUser.id });
                const operation = await db.Operations.create({
                    productId: GetProduct.id,
                    NameProduct: GetProduct.productName,
                    ValueProduct: GetProduct.price,
                    orderId: newOrder.id
                });
                await newOrder.addOperations(operation, { through: { selfGranted: false } });
                const Result = await db.Orders.findOne({
                    where:{ 
                        userId: GetUser.id
                     },
                    include:['operations']
                });
                const ConstOper = await db.Operations.findAll({
                    where:{
                        orderId: Result.id
                    }
                });
                const ReduceResult = await ConstOper.reduce((a,b) => a+(b.ValueProduct * b.quantity), 0);
                await db.Orders.update({
                        totalCost: ReduceResult
                    },{
                        where: {
                            id: Result.id
                        }
                });  

                res.status(201).json(Result.operations);

            }else{

                const GetOperation = await db.Operations.findOne({ 
                    where: {
                        orderId: GetOrder.id,
                        productId: GetProduct.id
                    } 
                });

                if( GetOperation ){

                    const { quantity } = await db.Operations.findOne({
                        where:{
                            orderId: GetOrder.id,
                            productId: GetProduct.id
                        }
                    });
                    await db.Operations.update({
                        quantity: quantity+1
                    },{
                        where: { 
                            orderId: GetOrder.id,
                            productId: GetProduct.id 
                        }
                    });
                    const Result = await db.Orders.findOne({
                        where:{ userId: GetUser.id },
                        include:['operations']
                    });
                    const ConstOper = await db.Operations.findAll({
                        where:{
                            orderId: Result.id
                        }
                    });
                    const ReduceResult = await ConstOper.reduce((a,b) => a+(b.ValueProduct * b.quantity), 0);
                    await db.Orders.update({
                            totalCost: ReduceResult
                        },{
                            where: {
                                id: Result.id
                            }
                    }); 
                    res.status(200).json(Result.operations);
                }
                else{ 

                    const Order = await db.Orders.findOne({ 
                        where:{
                            userId: GetUser.id,
                            stateOrder: 'pendiente'
                        } 
                    });
                    const operation = await db.Operations.create({
                        productId: GetProduct.id,
                        NameProduct: GetProduct.productName,
                        ValueProduct: GetProduct.price,
                        orderId: Order.id
                    });

                    await Order.addOperations(operation, { through: { selfGranted: false } });

                    const Result = await db.Orders.findOne({
                        where:{ 
                            userId: GetUser.id,
                            stateOrder: 'pendiente'
                         },
                        include:['operations']
                    });

                    const ConstOper = await db.Operations.findAll({
                        where:{
                            orderId: Result.id,
                        }
                    });
                    
                    const ReduceResult = await ConstOper.reduce((a,b) => a+(b.ValueProduct * b.quantity), 0);
    
                    await db.Orders.update({
                            totalCost: ReduceResult
                        },{
                            where: {
                                id: Result.id
                            }
                    });  
                    res.status(200).json(Result.operations);
                }
            }
        } else {
            res.status(400).json('El id del producto ingresado no existe');
        }
};

//Obtener orden del usuario con id user
exports.getOUserId = async (req, res) => {
    const { email } = req.body;
    const UserId = await db.Users.findOne({ where: {email} });
    try {
        const UsersOrder = await db.Orders.findAll({
            where: { 
                userId: UserId.id, 
                stateOrder: 'pendiente' 
            },
            include:['operations']
        });
        res.status(200).json(UsersOrder);

    } catch (error){
        res.status(400).json(error);
    }
};


