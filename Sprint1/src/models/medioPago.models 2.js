const {newProduct} = require('./productos.models');

const PayMents = [
    {
        id: 1,
        medioDePago: "efectivo"
    },
    {
        id: 2,
        medioDePago: "Pago PSE"
    },
    {
        id: 3,
        medioDePago: "tarjeta"
    }
];

const getingPayments = () =>{
    return PayMents;
};

const addingPayments = (newPayment) =>{
    const id = PayMents.length+1;
    const pay = {
        id: id,
        medioDePago: newPayment
    }
    return PayMents.push(pay);
};

module.exports = {getingPayments, addingPayments};