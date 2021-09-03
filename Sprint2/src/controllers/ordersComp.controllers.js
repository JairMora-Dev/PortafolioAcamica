const db = require('../database/db');

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
