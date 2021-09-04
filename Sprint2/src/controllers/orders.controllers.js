const db = require('../database/db');

exports.getAll = async (req, res) => {
    try {
        const GetAllOrders = await db.Users.findAll({
            include: ['orders', 'addresses']
        });
        res.json(GetAllOrders);
    } catch (error) {
        res.status(400).json(error);
    }
};

//Obtener orden del usuario con id user
exports.getOUserId = async (req, res) => {
    const emailT  = req.user.email;
    const UserId = await db.Users.findOne({ where: {email: emailT} });
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

//incorporar un producto a la orden
exports.create = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;
    const GetProduct = await db.Products.findOne({ where: { id } });
    const GetUser = await db.Users.findOne({ where: { email: email } });
    const GetOrder = await db.Orders.findOne({ where: { userId: GetUser.id, stateOrder: 'pendiente' } });
    const GetCONorder = await db.Orders.findOne({ where: { userId: GetUser.id, stateOrder: !'pendiente' } });
    console.log(GetCONorder);
    
    try {
        if (GetProduct){
            if(!GetOrder || GetOrder.stateOrder != 'pendiente'){
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
                            userId: GetUser.id,
                            stateOrder: 'pendiente'
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
                        where:{
                            userId: GetUser.id,
                            stateOrder: 'pendiente' 
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

    } catch (error) {
        res.status(500).json(error);
    }
};

//eliminar un producto de la orden
exports.DeleteOneProduct = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    const GetProduct = await db.Products.findOne({ where: { id } });
    const GetUser = await db.Users.findOne({ where: { email: email } });
    const GetOrder = await db.Orders.findOne({ where: { userId: GetUser.id, stateOrder: 'pendiente' } });
    
    if(GetProduct){
        if(!GetOrder){
            res.status(400).json('Senior usuario, no tiene ordenes en estados pendietes')
        }else{
            const GetOperation = await db.Operations.findOne({
                where:{
                    orderId: GetOrder.id,
                    productId: GetProduct.id
                }
            });

            if(GetOperation){
                if( GetOperation.quantity > 1 ){
                    await db.Operations.update({
                        quantity: GetOperation.quantity-1
                    },{ 
                        where:{
                            orderId: GetOrder.id,
                            productId: GetProduct.id
                        }
                    });

                    const ConstOper = await db.Operations.findAll({
                        where:{
                            orderId: GetOrder.id,
                        }
                    });
                    
                    const ReduceResult = await ConstOper.reduce((a,b) => a+(b.ValueProduct * b.quantity), 0);
                    await db.Orders.update({
                        totalCost: ReduceResult
                    },{
                        where: {
                            id: GetOrder.id,
                            stateOrder: 'pendiente'
                        }
                     });  

                    res.status(200).json('Al producto ' + GetProduct.id +' se le ha eliminado una unidad de su cantidad')
    
                }else{
                    await db.Operations.destroy({ 
                        where: {
                            productId: GetProduct.id
                        }
                    });

                    const ConstOper = await db.Operations.findAll({
                        where:{
                            orderId: GetOrder.id,
                        }
                    });
                    
                    const ReduceResult = await ConstOper.reduce((a,b) => a+(b.ValueProduct * b.quantity), 0);
                    await db.Orders.update({
                        totalCost: ReduceResult
                    },{
                        where: {
                            id: GetOrder.id,
                            stateOrder: 'pendiente'
                        }
                     }); 

                    res.status(200).json('Producto ' + GetProduct.id + ' eliminado de la orden')
                }
            }else{
                res.status(400).json('El id del producto en la orden no existe')
            }
        }
    }else{
        res.status(400).json('El id del producto a eliminar no existe');
    }
};



