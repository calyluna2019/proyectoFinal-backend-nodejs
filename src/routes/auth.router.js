const { Router } = require('express');
require("../config/passport");
const passport = require("passport");
const {
    postLogin,
    getFailLogin,
    logout
} = require('../controllers/auth.controller');

const router = Router();

router.post('/login', 
    passport.authenticate("local", {
        failureRedirect: "/api/auth/login",
    }), postLogin);

router.get("/login", getFailLogin);
router.get("/logout", logout)

module.exports = router;