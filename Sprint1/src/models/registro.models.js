const Users = [
    {
        id: 1,
        usuario: "Delilah1",
        nombre: "Delilah Resto",
        password: "del0al10",
        email: "delila-09@cliente.com",
        direccion: "Calle12A#12-12",
        telefono: 6556556,
        isAdmin: true    
    },
    {
        id: 2,
        usuario: "Jacobo1",
        nombre: "Jacobo",
        password: "01234",
        email: "jacob@comida.com",
        direccion: "Calle 23 #32-23",
        telefono: 4545544,
        isAdmin: false 
    }
];
 

const getingUsers = () => {
    return Users;
};

const newUsers = (User) => {
    Users.push(User);
};

module.exports = {getingUsers, newUsers};