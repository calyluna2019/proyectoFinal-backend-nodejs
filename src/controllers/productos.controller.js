const { ProductoDao } = require('../daos/index');
const product = ProductoDao.newProductDao();

async function getProductos(req, res) {
    const id = req.params.id || null;
    if (id !== null){
        const producto = await product.getById(id);
        if (producto.id){
            res.status(200).json(producto);
        } else {
            res.status(400).json({error:'producto no encontrado'});
        }
    } else {
        const productos = await product.getAll();        
        res.status(200).json(productos);
    }
}
async function getProductosCategoria(req, res) {
    const categoria = req.params.categoria || null;
    const productosCategoria = await product.getAll({categoria});
    if (productosCategoria.length > 0) {
        res.status(200).json(productosCategoria);
    } else {
        res.status(400).json({error:'Categoria no encontrada'});
    }
}
async function saveProducto(req, res) {
    const productos = req.body;
    const saveProd = await product.save(productos);
    if(saveProd.id) {
        res.status(201).json({msg: 'Registro Exitoso!',id:saveProd.id});
    } else {
        res.status(400).json({error:saveProd});
    }
}
async function updateProducto(req, res) {
    const id = req.params.id;
    const producto = await product.getById(id);
    if (producto.id) {
        await product.updateById(id, req.body);
        res.status(200).json({msg: 'Actualizado Ok',id});
    } else {
        res.status(400).json({error:producto});
    }
}

async function deleteProducto(req, res) {
    const id = req.params.id;
    const producto = await product.getById(id);
    if (producto.id) {
        await product.deleteById(id);
        res.status(200).json({msg:'Producto eliminado',id});
    } else {
        res.status(400).json({error:producto});
    }
}


module.exports = {
    getProductos,
    getProductosCategoria,
    saveProducto,
    updateProducto,
    deleteProducto
}