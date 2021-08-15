module.exports = ( sequelize, DataTypes ) =>{
    const Product = sequelize.define('products', {
        roductName:{
            type: DataTypes.STRING
        },
        price:{
            type: DataTypes.FLOAT
        }
    });
    return Product
};