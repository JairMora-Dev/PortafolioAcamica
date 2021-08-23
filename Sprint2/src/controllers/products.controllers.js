const db = require('../database/db');


exports.getAll = async (req, res) => {
    try {
        const GetProducts = await db.Products.findAll({
        });
        res.json(GetProducts);     
    } catch (error) {
        res.status(400).json(error);
    }
};

exports.create = async (req, res) => {
    const { productName, price } = req.body;
    try {
        await db.Products.findOrCreate({
            where:{
                productName,
                price
            },
            defaults:{ 
            productName: req.body.productName, 
            price: req.body.price 
            } 
        });

        res.status(200).json(`Producto ${productName} creado`);
    } catch (error) {
        res.status(400).json(error + 'no');
    }
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { productName, price } = req.body;

    const FindIDproduct = await db.Products.findOne({
        where: { 
            id
        }
    });
    
    try {
        if(  FindIDproduct ){
            await db.Products.upsert({ productName, price }, {
                where: {
                    id
                }
            });
            res.json(`Producto con id ${id} actualizado`);
        }else{
            res.status(400).json('El id del producto a actualizar no existe, por favor verifique su solicitud');
        }
    } catch (error) {
        res.status(400).json(error)
    }
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    const FindIDproduct = await db.Products.findOne({
        where: { 
            id
        }
    });

    try {
        if (FindIDproduct){
            await db.Products.destroy({
                where: {
                    id: id
                }
            });
            res.status(200).json('Producto eliminado exitosamente');
        }else{
            res.status(400).json('El id del producto a eliminar no existe porfavor, verifique su slicitud');
        }
        
    } catch (error) {
        res.status(400).json(error);
    }
};

