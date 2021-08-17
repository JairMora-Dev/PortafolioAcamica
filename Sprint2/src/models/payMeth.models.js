module.exports = ( sequelize, DataTypes ) =>{
    const PayMethods = sequelize.define('payMethods', {
        payMeth:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return PayMethods
};

