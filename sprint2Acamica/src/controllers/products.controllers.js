const db = require('../database/db');

exports.getAll = async (req, res) => {
    const GetProducts = await db.Products.findAll({
    });
    res.json(GetProducts);
};

exports.create = async (req, res) => {
    const { productName, price } = req.body;
    const newProduct = await db.Products.create({  productName, price  });
    res.json(newProduct);
};

exports.update = async (req, res) => {
    const { id } = req.params;
    const { productName, price } = req.body;
    const updateProduct = await db.Products.update({ productName, price }, {
        where: {
            id
        }
    });
    res.json(updateProduct);
};

exports.destroy = async (req, res) => {
    const { id } = req.params;
    const deleteProduct = await db.Products.destroy({
        where: {
            id: id
        }
    });
    res.json('Producto eliminado exitosamente');
}

