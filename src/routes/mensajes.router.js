const { Router } = require('express');
const {
    getMensajes,
    saveMensaje
} = require('../controllers/mensajes.controller');
const {sessionAdmin } = require('../middlewares/sessionAdmin');

const router = Router()

router.get('/:email', sessionAdmin, getMensajes);
router.post('/', sessionAdmin, saveMensaje);

module.exports = router;