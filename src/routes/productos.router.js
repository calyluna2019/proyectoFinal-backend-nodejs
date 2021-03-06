const { Router } = require('express');
const {
    getProductos,
    saveProducto,
    updateProducto,
    deleteProducto
} = require('../controllers/productos.controller');
const { administrador } = require('../middlewares/admin');


const router = Router();

router.get('/:id?', getProductos);
router.post('/', administrador, saveProducto);
router.put('/:id', administrador, updateProducto);
router.delete('/:id', administrador, deleteProducto);


module.exports = router;