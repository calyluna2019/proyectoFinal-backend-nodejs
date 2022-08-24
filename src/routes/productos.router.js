const { Router } = require('express');
const {
    getProductos,
    getProductosCategoria,
    saveProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/productos.controller');
const { administrador } = require('../middlewares/admin');
const { sessionAdmin } = require('../middlewares/sessionAdmin');


const router = Router();

router.get('/:id?', sessionAdmin, getProductos);
router.get('/categoria/:categoria', sessionAdmin, getProductosCategoria);
router.post('/', administrador, saveProducto);
router.put('/:id', administrador, updateProducto);
router.delete('/:id', administrador, deleteProducto);


module.exports = router;