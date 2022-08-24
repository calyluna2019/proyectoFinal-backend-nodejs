const { CarritoDao } = require('../daos/index');
const carrito = CarritoDao.newCartDao();

async function createCarrito(req, res) {
    const { email } = req.user;
    const data = await carrito.createCarrito(email);
    if(data.id) {
        res.status(201).json({msg: 'Registro Exitoso!',id:data.id});
    } else {
        res.status(400).json({error:data});
    }
}
async function deleteCarrito(req, res) {
    const id = req.params.id;
    const carritoById = await carrito.getById(id);
    if (carritoById.id) {
        await carrito.deleteById(id)
        res.status(200).json({msg: "carrito eliminado",id});
    } else {
        res.status(400).json({error:carritoById});
    }
}
async function getProductosCarrito(req, res) {
    const id = req.params.id;
    const carritoById = await carrito.getById(id);
    if (carritoById.id) {
        res.status(200).json(carritoById.productos);
    } else {
        res.status(400).json({error:carritoById});
    }
}
async function addProductoCarrito(req, res) {
    const id = req.params.id;
    const productos = req.body;
    const carritoById = await carrito.getById(id);
    if (carritoById.id) {
        const response = await carrito.saveProduct(productos, id);
        if(response.id) {
            res.status(200).json({msg:"Producto Agregado.",response});
        } else {
            res.status(400).json({error:response});
        }
    } else {
        res.status(400).json({error:carritoById});
    }
}
async function deleteProductoCarrito(req, res) {
    const id = req.params.id;
    const id_prod = req.params.id_prod;
    const carritoById = await carrito.getById(id);
    if (carritoById.id) {
        const carritoDelete = await carrito.deleteProduct(id_prod, id);
        if(carritoDelete.id) {
            res.status(200).json({mensaje: "Ok Producto Eliminado",id_producto:id_prod,id_carrito:id});
        } else {
            res.status(400).json({error:"Id Producto incorrecto"});
        }
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