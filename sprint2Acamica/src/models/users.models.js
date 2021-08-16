
module.exports = ( sequelize, DataTypes ) =>{
    const User = sequelize.define('users', {
        user:{
            type: DataTypes.STRING
        },
        name:{
            type: DataTypes.STRING
        },
        password:{
            type: DataTypes.STRING
        },
        email:{
            type: DataTypes.STRING
        },
        phone:{
            type: DataTypes.INTEGER
        },
        isAdmin:{
            type: DataTypes.BOOLEAN
        }
    });
    return User
};