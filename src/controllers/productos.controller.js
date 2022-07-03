const { newProduct } = require('../models/Producto');
const product = newProduct();

async function getProductos(req, res) {
    const id = req.params.id || null;

    if (id !== null){
        const producto = await product.getById(parseInt(id));
        if (producto !== null){
            res.status(200).json(producto);
        } else {
            res.status(400).json({error:'producto no encontrado'});
        }
    } else {
        const productos = await product.getAll();        
        res.status(200).json(productos);
    }
}

async function saveProducto(req, res) {
    const productos = req.body;
    await product.save(productos);
    res.status(201).json({msg: `Registro Exitoso!`});
}
async function updateProducto(req, res) {
    const id = parseInt(req.params.id);
    const producto = await product.getById(id);

    if (producto !== null) {
        await product.updateById(id, req.body);
        res.status(200).json({msg: 'Actualizado Ok',id});
    } else {
        res.status(400).json({error:'No existe producto'});
    }
}

async function deleteProducto(req, res) {
    const id = parseInt(req.params.id);
    const producto = await product.getById(id);
    if (producto) {
        await product.deleteById(id);
        res.status(200).json({msg:'Producto eliminado',id});
    } else {
        res.status(400).json({error:'No existe producto'});
    }
}


module.exports = {
    getProductos,
    saveProducto,
    updateProducto,
    deleteProducto
}