const db = require('../database/db');

exports.getAll = async (req, res) => {
    const getPayMethods = await db.PayMethods.findAll({ 
    });
    res.json(getPayMethods);
};

exports.create = async (req, res) => {
    const { NamePay } = req.body;
    const  FindPayName  = await db.PayMethods.findOne({
        where: {
            NamePay 
        }
    });
    
    if( NamePay == FindPayName.NamePay ){
        res.status(400).json('El nombre de metodo de pago ya existe, porfavor verifique su solicitud');
    }else{
        const newPayMeth = await db.PayMethods.create({ NamePay });
        res.status(200).json(newPayMeth);
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { NamePay } = req.body;
    const IdPayMeth = await db.PayMethods.findOne({
        where: { id }
    });
    
    if( IdPayMeth ){
        const updatePayMeth = await db.PayMethods.update({ NamePay },{
            where:{
                id
            }
        });
        res.status(201).json(updatePayMeth);
    }else{
        res.status(400).json('El id del metodo de pago no existe, porfavor verifique su solicitud');
    }
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    const IdPayMeth = await db.PayMethods.findOne({
        where: { id }
    });

    if(IdPayMeth){
        await db.PayMethods.destroy({
            where: {
                id: id 
            }
        });
        res.status(200).json('Metodo de pago aliminado');
    }else{
        res.status(400).json('El id del metodo de pago no existe, porfavor verifique su solicitud');      
    }
};