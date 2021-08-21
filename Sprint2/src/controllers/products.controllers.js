const db = require('../database/db');


exports.getAll = async (req, res) => {
    const GetProducts = await db.Products.findAll({
    });
    res.json(GetProducts);
};

exports.create = async (req, res) => {
    const { productName, price } = req.body;
    const FindproductName = await db.Products.findOne({
        where: { 
            productName
        }
    });

    if( productName == FindproductName.productName ){
        res.status(400).json('El nombre del producto que ingreso ya existe en el catalogo, porfavor ingrese otro');
    }else{
        const newProduct = await db.Products.create({  productName, price  });
        res.status(200).json(newProduct);
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
    
    if(  FindIDproduct ){
        const updateProduct = await db.Products.update({ productName, price }, {
            where: {
                id
            }
        });
        res.json(updateProduct);
    }else{
        res.status(400).json('El id del producto a actualizar no existe, por favor verifique su solicitud');
    }
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    const FindIDproduct = await db.Products.findOne({
        where: { 
            id
        }
    });

    if (FindIDproduct){
        const deleteProduct = await db.Products.destroy({
            where: {
                id: id
            }
        });
        res.status(200).json('Producto eliminado exitosamente');
    }else{
        res.status(400).json('El id del producto a eliminar no existe porfavor, verifique su slicitud');
    }
};

