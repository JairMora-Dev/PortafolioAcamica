module.exports = ( sequelize, DataTypes ) =>{
    const Order = sequelize.define('orders', {
        payMethods:{
            type: DataTypes.INTEGER
        },
        totalCost:{
            type: DataTypes.FLOAT
        }
    });
    return Order
};