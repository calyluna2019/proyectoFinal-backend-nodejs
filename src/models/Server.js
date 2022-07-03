const express = require('express');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.paths = {
            productos: '/api/productos',
            carrito: '/api/carrito'
        }

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.paths.productos, require('../routes/productos.router'));
        this.app.use(this.paths.carrito, require('../routes/carritos.router'));

        this.app.use('*', (req, res) => {
            const path = req.originalUrl;
            const metodo = req.method;
            res.status(401).json({
                    error: -2,
                    descripcion:`ruta ${path} método ${metodo} no implementada`
            });
        })
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`server listening on port ${this.port}`);
        });
    }
}

module.exports = Server;