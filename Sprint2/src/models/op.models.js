module.exports = ( sequelize, DataTypes ) =>{
    const Operations = sequelize.define('operations', {
        NameProduct:{
            type: DataTypes.STRING,
            allowNull: false
        },
        ValueProduct:{
            type: DataTypes.FLOAT,
            allowNull: false
        },
        quantity:{
            type: DataTypes.FLOAT,
            allowNull: false, 
            defaultValue: 1
        }
    });
    return Operations
};