require('dotenv').config();
const ProductoDaoMongoDb = require('./productos/ProductoDaoMongoDb');
const CarritoDaoMongoDb = require('./carritos/CarritoDaoMongoDb');
const UserDaoMongoDb = require('./users/UserDaoMongoDb');
const MensajeDaoMongoDb = require('./mensajes/MensajeDaoMongoDb');
const OrdenDaoMongoDb = require('./ordenes/OrdenDaoMongoDb');

let ProductoDao;
let CarritoDao;
let UserDao;
let MensajeDao;
let OrdenDao;

if (process.env.ENGINE == 'MONGODB'){
    ProductoDao = ProductoDaoMongoDb;
    CarritoDao = CarritoDaoMongoDb;
    UserDao = UserDaoMongoDb;
    MensajeDao = MensajeDaoMongoDb;
    OrdenDao = OrdenDaoMongoDb;
}

module.exports = {
    ProductoDao,
    CarritoDao,
    UserDao,
    MensajeDao,
    OrdenDao
}