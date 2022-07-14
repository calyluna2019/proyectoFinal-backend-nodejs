require('dotenv').config();
const ProductoDaoArchivo = require('./productos/ProductoDaoArchivo');
const ProductoDaoFirebase = require('./productos/ProductoDaoFirebase');
const ProductoDaoMongoDb = require('./productos/ProductoDaoMongoDb');

const CarritoDaoArchivo = require('./carritos/CarritoDaoArchivo');
const CarritoDaoFirebase = require('./carritos/CarritoDaoFirebase');
const CarritoDaoMongoDb = require('./carritos/CarritoDaoMongoDb');

let ProductoDao;
let CarritoDao;

if (process.env.ENGINE == 'ARCHIVO'){
    ProductoDao = ProductoDaoArchivo;
    CarritoDao = CarritoDaoArchivo;
}

if (process.env.ENGINE == 'MONGODB'){
    ProductoDao = ProductoDaoMongoDb;
    CarritoDao = CarritoDaoMongoDb;
}

if (process.env.ENGINE == 'FIREBASE'){
    ProductoDao = ProductoDaoFirebase;
    CarritoDao = CarritoDaoFirebase;
}


module.exports = {
    ProductoDao,
    CarritoDao
}