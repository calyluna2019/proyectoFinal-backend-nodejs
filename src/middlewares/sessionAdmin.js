const { response } = require('express');

const sessionAdmin = ( req, res = response, next ) => {
    const path = req.originalUrl;
    const metodo = req.method;
    const admin = req.isAuthenticated();
    if (!admin){
        return res.status(401).json({
            error: -1,
            descripcion:`ruta ${path} método ${metodo} no autorizada`
        });
    }

    next();
}

module.exports = {
    sessionAdmin
}