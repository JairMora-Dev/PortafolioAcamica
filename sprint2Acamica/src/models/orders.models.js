module.exports = ( sequelize, DataTypes ) =>{
    const Order = sequelize.define('orders', {
        totalCost:{
            type: DataTypes.FLOAT
        },
        quantityProducts:{
            type: DataTypes.INTEGER
        },
        stateOrder:{
            type: DataTypes.STRING
        }
    });
    return Order
};