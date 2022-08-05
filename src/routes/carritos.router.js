const { Router } = require('express');
const {
    createCarrito,
    deleteCarrito,
    getProductosCarrito,
    addProductoCarrito,
    deleteProductoCarrito
} = require('../controllers/carritos.controller');
const { sessionAdmin } = require('../middlewares/sessionAdmin');

const router = Router();

router.post('/', sessionAdmin, createCarrito)
router.delete('/:id', sessionAdmin, deleteCarrito)
router.get('/:id/productos', sessionAdmin, getProductosCarrito)
router.post('/:id/productos', sessionAdmin, addProductoCarrito)
router.delete('/:id/productos/:id_prod', sessionAdmin, deleteProductoCarrito)

module.exports = router;