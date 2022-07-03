const { Router } = require('express');
const {
    createCarrito,
    deleteCarrito,
    getProductosCarrito,
    addProductoCarrito,
    deleteProductoCarrito
} = require('../controllers/carritos.controller');

const router = Router();

router.post('/',createCarrito)
router.delete('/:id',deleteCarrito)
router.get('/:id/productos',getProductosCarrito)
router.post('/:id/productos',addProductoCarrito)
router.delete('/:id/productos/:id_prod',deleteProductoCarrito)

module.exports = router;