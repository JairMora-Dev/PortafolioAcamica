module.exports = ( sequelize, DataTypes ) =>{
    const PayMethods = sequelize.define('payMethods', {
        NamePay:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return PayMethods
};

