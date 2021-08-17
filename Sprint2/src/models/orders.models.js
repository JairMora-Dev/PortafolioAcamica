module.exports = ( sequelize, DataTypes ) =>{
    const Order = sequelize.define('orders', {
        totalCost:{
            type: DataTypes.FLOAT,
            allowNull: false,
            defaultValue: 0
        },
        quantityProducts:{
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        stateOrder:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pendiente"
        }
    });
    return Order
};