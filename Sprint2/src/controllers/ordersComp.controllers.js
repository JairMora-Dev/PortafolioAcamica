const db = require('../database/db');
const { Op } = require("sequelize");

//Obtener orden confirmada de un usuario
exports.AdmingetUserOrder = async (req, res) => {
    const { id } = req.params;
    try {
        const GetAllOrders = await db.Users.findOne({
            include: ['orders', 'addresses'],
            where:{
                id
            }
        });
        res.status(200).json(GetAllOrders);
    } catch (error) {
        res.status(400).json(error);
    }
};


//Select paymethods
exports.Paymeth = async (req, res) =>{
    const { id } = req.params;
    const { email } =  req.body;

    const GetPayMeth = await db.PayMethods.findOne({ where: { id }  });
    const GetUser = await db.Users.findOne({ where: { email } });
    const GetOrder = await db.Orders.findOne({ where: { userId: GetUser.id, stateOrder: 'pendiente' } });

    if( GetPayMeth ){
        if( GetOrder ){
            await db.Orders.update({ 
                payMethodId: GetPayMeth.id
             },{ 
                where:{ 
                    id: GetOrder.id   
                  }
            });

            res.status(200).json('Senior usuario usted a seleccionado ' + GetPayMeth.NamePay + ' como metodo de pago');
        }else{
            res.status(400).json('Senior usuario usted no tiene ordenes en proceso');
        }


    }else{
        res.status(400).json('El id del metodo de pago no existe');    
    }
};

//select direcciones
exports.Address = async (req, res) => {
    const { id } = req.params;
    const { email } =  req.body;

    const GetUser = await db.Users.findOne({ where: { email } });
    const GetAddress = await db.Addresses.findOne({ where: { id, userId: GetUser.id } });
    const GetOrder = await db.Orders.findOne({ where: { userId: GetUser.id, stateOrder: 'pendiente' } });

    if (GetAddress) {
        if (GetOrder) {
            await db.Orders.update({
                addressId: GetAddress.id
            }, {
                where:{
                    id: GetOrder.id
                }
            })
            res.status(200).json('Senior usuario usted a seleccionado ' + GetAddress.place + ' como dir de envio');

        } else {
            res.status(400).json('Senior usuario usted no tiene ordenes en proceso');
        }
    } else {
        res.status(400).json('El id de la direccion no existe en su lista');
    }
};

//para pasar la orden a estado confirmado
exports.ConfirmOrder = async (req, res) => {
    const { id } = req.params;
    const { email } = req.body;

    const GetUser = await db.Users.findOne({ where: { email } });
    const GetOrder = await db.Orders.findOne({ where: { id, userId: GetUser.id, stateOrder: 'pendiente' } });

    if (GetOrder) {

        if ((GetOrder.addressId, GetOrder.payMethodId) == null){
            res.status(400).json('Senior usuario porfavor antes de confirmar su orden proporcione una direccion y un metodo de pago')
        } else {
            const Confir = await db.Orders.update(
                { 
                    stateOrder: 'confirmada' 
                },
                { 
                    where: {
                        id: GetOrder.id,
                        userId: GetUser.id,
                        stateOrder: 'pendiente'
                    }
                }
            );
            res.status(200).json('Su orden a sido **confirmada** en breve se la prepararemos');
        }
    } else {
        res.status(400).json('Senior usuario usted no tiene ordenes pendientes o el id de la Orden no existe en su lista');
    }
};

exports.ChangeStateOr = async (req, res) => {
    const { id } = req.params;
    const { stateOrder } = req.body;
    const Opcion = 'confirmada';
    const Opcion1 = 'en preparacion';
    const Opcion2 = 'enviada';
    const Opcion3 = 'entregada';
    const GetOrderCon = await db.Orders.findOne({ where: { id, stateOrder: { [Op.ne]: 'pendiente' } }});
    

    if ( Opcion1 == stateOrder || Opcion2 == stateOrder || Opcion3 == stateOrder ) {
        if( GetOrderCon ){
            await db.Orders.update({
                stateOrder
            }, {
                where: {
                    id
                }
            });
    
            res.status(201).json('La orden con id: ' + id + ' a sido actualizada a estado de: ' + stateOrder );
    
        }else{
            res.status(400).json('El id de la orden en estado ' + Opcion + ' no existe');
        }
    } else {
        res.status(400).json('favor ingrese un estado de orden valido');
    }
};

