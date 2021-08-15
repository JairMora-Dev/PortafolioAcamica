module.exports = ( sequelize, DataTypes ) =>{
    const State = sequelize.define('states', {
        stateOrder:{
            type: DataTypes.STRING
        }
    });
    return State
};