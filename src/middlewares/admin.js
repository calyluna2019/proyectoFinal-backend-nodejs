const { response } = require('express');

const administrador = ( req, res = response, next ) => {
    const admin = req.user.rol;
    const path = req.originalUrl;
    const metodo = req.method;
    if (admin !== "ADMIN"){
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