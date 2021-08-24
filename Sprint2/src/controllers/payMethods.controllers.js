const db = require('../database/db');

exports.getAll = async (req, res) => {
    try {
        const getPayMethods = await db.PayMethods.findAll({ 
        });
        res.json(getPayMethods);
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.create = async (req, res) => {
    const { NamePay } = req.body;
    const  FindPayName  = await db.PayMethods.findOne({
        where: {
            NamePay 
        }
    });
    
    try {
        const newPayMeth = await db.PayMethods.findOrCreate({ 
            where:{
                NamePay
            },
            defaults:{
                NamePay: req.body.NamePay
            } 
        });
        res.status(200).json(newPayMeth);
        
    } catch (error) {
        res.status(400).json(error);
    }
    
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { NamePay } = req.body;
    const IdPayMeth = await db.PayMethods.findOne({
        where: { id }
    });
    
    try {
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
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    const IdPayMeth = await db.PayMethods.findOne({
        where: { id }
    });

    try {
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
    } catch (error) {
        res.status(400).json(error);      
    }
};
