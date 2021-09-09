module.exports = ( sequelize, DataTypes ) =>{
    const Address = sequelize.define('addresses', {
       place:{
           type: DataTypes.STRING,
           allowNull: false
       }
    });
    return Address
};