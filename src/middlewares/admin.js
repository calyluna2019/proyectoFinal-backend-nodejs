const { response } = require('express');

/* provisorio */
const admin = true;
const administrador = ( req, res = response, next ) => {
    const path = req.originalUrl;
    const metodo = req.method;
    if (!admin){
        return res.status(401).json({
            error: -1,
            descripcion:`ruta ${path} método ${metodo} no autorizada`
        });
    }

    next();
}

module.exports = {
    administrador
}