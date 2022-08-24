const { Router } = require('express');
const {
    getInfo
} = require('../controllers/info.controller');
const { administrador } = require('../middlewares/admin');

const router = Router();

router.get('/', administrador, getInfo);

module.exports = router;