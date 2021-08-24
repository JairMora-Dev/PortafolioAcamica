const db = require('../database/db');

exports.getAll = async (req, res) => {
    const { email } = req.params;
    const emailToken = req.user.email;
    const GetEmailUser = await db.Users.findOne({
        where:{
            email
        }
    });
    try {
        if( !GetEmailUser ){
            res.status(401).json('El Email ingresado no existe en nuestra BD')
        }else{ 
            if ( GetEmailUser.email != emailToken ){
                res.status(400).json('Su email no corresponde con el token de acceso recibido, por favor rectifique su solicitud');
            }else{
                const GetAdress = await db.Addresses.findAll({
                    where: {
                        userId: GetEmailUser.id 
                    }
                });
                res.status(200).json(GetAdress);
            }
        }
    } catch (error) {
        res.status(401).json(error);
    }
};

exports.create = async (req, res) => {
    const { email } = req.params;
    const { place } = req.body;
    const emailToken = req.user.email;
    const GetEmailUser = await db.Users.findOne({
        where:{
            email
        }
    });
    try {
        if( !GetEmailUser ){
            res.status(401).json('El Email ingresado no existe en nuestra BD');
        }else{
            if( GetEmailUser.email != emailToken ){
                res.status(400).json('Su email no corresponde con el token de acceso recibido, por favor rectifique su solicitud');
            } else{
                const newPlace = await db.Addresses.create({
                    place,
                    userId: GetEmailUser.id
                });
                res.status(200).json(newPlace);
            }  
        }
    }catch (error) {
        res.status(401).json(error);    }
};

exports.update = async (req, res) => {
    const { id }= req.params;
    const { place, email } = req.body;
    const emailToken = req.user.email;
    const GetEmailUser = await db.Users.findOne({
        where:{
            email
        }
    });
    const IdAdd = await db.Addresses.findOne({
        where:{
            id
        }
    });

    try {
        if(GetEmailUser){
            if(GetEmailUser.email != emailToken){
                res.status(401).json('Su email no corresponde con el token de acceso recibido, por favor rectifique su solicitud')
            }else{
                if( IdAdd ){
                await db.Addresses.upsert({
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
            }
        }else{
            res.status(400).json('El email suministrado no existe en nuestra DB, porfavor rectifique su solicitud');
        }
        
    } catch (error) {
        res.status(401).json(error);    }
};


exports.destroy = async (req, res) => {
    const { id } = req.params;
    const emailToken = req.user.email;
    const { email } = req.body;
    const GetEmailUser = await db.Users.findOne({
        where:{
            email
        }
    });
    const findId = await db.Addresses.findOne({
        where:{
            id
        }
    });
    try {
        if(!GetEmailUser){
            res.status(401).json('El email suministrado no existe en nuestra DB, porfavor verifique')
        }else{
            if(GetEmailUser.email != emailToken){
                res.status(400).json('Su email no corresponde con el token de acceso recibido, porfavor rectifique su solicitud')
            }else{
                if( findId ){
                     await db.Addresses.destroy({
                         where: {
                             id
                         }
                 });
                res.status(200).json('Direccion eliminada');
                }else{
                    res.status(400).json('no se encontro el id del lugar a eliminar');
                } 
            }
        }

    } catch (error) {
        res.status(401).json(error);    }
};
