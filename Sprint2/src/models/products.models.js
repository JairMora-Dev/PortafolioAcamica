module.exports = ( sequelize, DataTypes ) =>{
    const Product = sequelize.define('products', {
        productName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
    return Product
};