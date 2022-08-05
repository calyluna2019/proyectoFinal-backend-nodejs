require('dotenv').config();
const ProductoDaoMongoDb = require('./productos/ProductoDaoMongoDb');
const CarritoDaoMongoDb = require('./carritos/CarritoDaoMongoDb');
const UserDaoMongoDb = require('./users/UserDaoMongoDb');

let ProductoDao;
let CarritoDao;
let UserDao;

if (process.env.ENGINE == 'MONGODB'){
    ProductoDao = ProductoDaoMongoDb;
    CarritoDao = CarritoDaoMongoDb;
    UserDao = UserDaoMongoDb;
}

module.exports = {
    ProductoDao,
    CarritoDao,
    UserDao
}