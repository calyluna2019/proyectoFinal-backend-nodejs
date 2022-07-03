const { newCarrito } = require('../models/Carrito');
const carrito = newCarrito();

async function createCarrito(req, res) {
    const id = await carrito.createCarrito()
    res.status(201).json({id});
}
async function deleteCarrito(req, res) {
    const id = parseInt(req.params.id);
    const carritoById = await carrito.getById(id);
    if (carritoById.id) {
        await carrito.deleteById(id)
        res.status(200).json({msg: "carrito eliminado",id});
    } else {
        res.status(400).json({error:'Id incorrecto'});
    }
}
async function getProductosCarrito(req, res) {
    const id = parseInt(req.params.id);
    const carritoById = await carrito.getById(id);
    if (carritoById !== null) {
        res.status(200).json(carrito.productos);
    } else {
        res.status(400).json({error:'Id incorrecto'});
    }
}
async function addProductoCarrito(req, res) {
    const id = parseInt(req.params.id);
    const productos = req.body;
    const carritoById = await carrito.getById(id);
    if (carritoById !== null) {
        await carrito.saveProduct(productos, id);
        res.status(200).json({msg:"Productos Agregados."});
    } else {
        res.status(400).json({error:'ID incorrecto'});
    }
}
async function deleteProductoCarrito(req, res) {
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    const carritoById = await carrito.getById(id);
    if (carritoById !== null) {
        await carrito.deleteProduct(id_prod, id);
        res.status(200).json({mensaje: `Se ha eliminado el producto ${id_prod} del carrito: ${id}`});
    } else {
        res.status(400).json({error:'carrito no encontrado'});
    }
}

module.exports = {
    createCarrito,
    deleteCarrito,
    getProductosCarrito,
    addProductoCarrito,
    deleteProductoCarrito
};