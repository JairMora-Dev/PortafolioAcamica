module.exports = ( sequelize, DataTypes ) =>{
    const Product = sequelize.define('products', {
        productName:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    });
    return Product
};