const Products = [
    {
        id: 1,
        productName: "Bagel de Salmon",
        price: 425  
    },
    {
        id: 2,
        productName: "Hamburguesa Calsica",
        price: 350  
    },
    {
        id: 3,
        productName: "Sandwich veggie",
        price: 310  
    },
    {
        id: 4,
        productName: "Ensalada veggie",
        price: 340 
    },
    {
        id: 5,
        productName: "Focaccia",
        price: 300
    }, 
    {
        id:6,
        productName: "Cocacola",
        price: 5
    }

];
 
const getingProduct = () => {
    return Products;
};

const newProduct = (product) => {
    Products.push(product);
};


module.exports = {getingProduct, newProduct};