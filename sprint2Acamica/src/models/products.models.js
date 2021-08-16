module.exports = ( sequelize, DataTypes ) =>{
    const Product = sequelize.define('products', {
        productName:{
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.FLOAT
        }
    });
    return Product
};