const { Router } = require('express');
const {
    getUser,
    saveUser,
    updateUser
} = require('../controllers/users.controller');
const {sessionAdmin } = require('../middlewares/sessionAdmin');

const router = Router();

router.get('/', sessionAdmin, getUser);
router.post('/', saveUser);
router.put('/:id', sessionAdmin, updateUser);

module.exports = router;