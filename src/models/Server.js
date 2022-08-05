require('dotenv').config();
const express = require('express');
const { mongoConnection } = require('../config/globals');
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const passport = require("passport");
const storeMongo = require("connect-mongo");
const session = require("express-session");
require("../config/passport");
class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8080;

        this.paths = {
            productos: '/api/productos',
            carrito: '/api/carrito',
            users: '/api/users',
            auth: '/api/auth'
        }
        this.conectarDB();
        this.middlewares();
        this.routes();
    }

    async conectarDB(){
        if (process.env.ENGINE == 'MONGODB'){
            await mongoConnection();
        }
    }

    middlewares() {
        this.app.use(express.json());
        // this.app.use(express.static('public'));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        /* this.app.use(engine({
            layoutsDir: path.join(__dirname, "../../views/layouts"),
            defaultLayout: "index",
            extname: ".hbs",
        })); */
        this.app.set("views", path.join(__dirname, "../../views"));
        this.app.set("view engine", "hbs");
        this.app.use(cookieParser());
        this.app.use(session({
                store: storeMongo.create({
                    mongoUrl: process.env.MONGO_URI,
                    mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
                }),
                secret: "c0d3r-h0us3",
                rolling: true,
                resave: false,
                saveUninitialized: false,
                cookie: { maxAge: 600 * 1000 },
            })
        );
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    routes() {
        this.app.use(this.paths.productos, require('../routes/productos.router'));
        this.app.use(this.paths.carrito, require('../routes/carritos.router'));
        this.app.use(this.paths.users, require('../routes/users.router'));
        this.app.use(this.paths.auth, require('../routes/auth.router'));

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