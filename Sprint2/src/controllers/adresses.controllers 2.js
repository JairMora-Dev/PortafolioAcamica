const db = require('../database/db');

exports.getAll = async (req, res) => {
    const { id } = req.params;
    const token = req.user.email
    const UserInfo = await db.Users.findOne({
        where:{
            id,
            email: token
        }
    });
    try {
        if (UserInfo) {
            const GetAdress = await db.Addresses.findAll({
                where: {
                    userId: UserInfo.id 
                }
            });
            res.status(200).json(GetAdress);
        } else {
            res.status(400).json('Su token no coincide con la info que solicita, o el id de usuario suministrado no existe');
        }
    }catch (error) {
        res.status(401).json(error);
    }
};

exports.create = async (req, res) => {
    const { place, email } = req.body;
    const GetEmailUser = await db.Users.findOne({
        where:{
            email
        }
    });
    try {
        const newPlace = await db.Addresses.create({
                place,
                userId: GetEmailUser.id
            });
            res.status(200).json(newPlace);
    }catch (error) { 
        res.status(401).json(error); 
    }
};

exports.update = async (req, res) => {
    const { id }= req.params;
    const { place, email } = req.body;
    const GetEmailUser = await db.Users.findOne({
        where:{
            email
        }
    });
    const IdAdd = await db.Addresses.findOne({
        where:{
            id,
            userId: GetEmailUser.id
        }
    });

    try {
        if( IdAdd ){
        await db.Addresses.update({
                place, 
                userId: GetEmailUser.id
            },{
                where:{
                    id
                }
            });
            res.status(201).json(`Direccion con id: ${id} actualizada`)
        }else{
            res.status(400).json('El id del lugar solicitado no existe, porfavor ingrese otro')
        }
    } catch (error) {
        res.status(401).json(error);    }
};


exports.destroy = async (req, res) => {
    const { id } = req.params;
    const findId = await db.Addresses.findOne({
        where:{
            id
        }
    });
    try {
       
        if( findId ){
            await db.Addresses.destroy({
                where: {
                 id
                }
            });
            res.status(200).json('Direccion eliminada');
        }else{
            res.status(400).json('El id ingresado del lugar no existe')
        }
    } catch (error) {
        res.status(401).json(error);    
    }
};
