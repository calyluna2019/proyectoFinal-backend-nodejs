const { Router } = require('express');
const {
    saveUser
} = require('../controllers/users.controller');

const router = Router();

router.post('/', saveUser);

module.exports = router;