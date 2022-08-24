const { Router } = require('express');
const {
    getOrdenes,
    guardarOrden
} = require('../controllers/ordenes.controller');
const { sessionAdmin } = require('../middlewares/sessionAdmin');

const router = Router();

router.get('/', sessionAdmin, getOrdenes);
router.post('/', sessionAdmin, guardarOrden);

module.exports = router;