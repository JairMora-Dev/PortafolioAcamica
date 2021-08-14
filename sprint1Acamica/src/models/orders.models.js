const Orders = [
    {
        id: 1,
        usuario: "Delilah1",
        direccion: "Calle12A#12-12",
        pedido:[],  
        costoTotal: 0,
        medioPago: "efectivo", 
        estado: "Pendiente" 
    },
    {
        id: 2,
        usuario: "Jacobo1",
        direccion: 'Calle 23 #32-23',
        pedido:[],
        costoTotal: 0,
        medioPago: "efectivo", 
        estado: "Pendiente" 
    }
];


//..........Estados de Pedidos..........
const statesUsersOrder =[
    {
        id: 2,
        estado: "Confirmado"
    }
];

const statesAdminOrders =[
    {
        id: 1,
        estado: "Pendiente"
    },
    {
        id: 3,
        estado: "EnPrepraracion"
    },
    {
        id: 4,
        estado: "Enviado"
    },
    {
        id: 5,
        estado: "Entregado"
    }
];


const getingOrder = () => {
    return Orders;
};

const newOrder = (Order) => {
    return Orders.push(Order);
};

const getStatesUsersOrders = () =>{
    return statesUsersOrder;
};

const getStatesAdminOrders = () =>{
    return statesAdminOrders;
};

function OrderItems(id, costoTotal, usuario, direccion, pedido, medioPago, estado) {
    return {
         id : id,
         costoTotal: costoTotal,
         usuario: usuario,
         direccion: direccion,
         pedido: pedido,
         medioPago: medioPago,
         estado: estado
        }
 };
 

module.exports = {getingOrder, newOrder, OrderItems, getStatesUsersOrders, getStatesAdminOrders};