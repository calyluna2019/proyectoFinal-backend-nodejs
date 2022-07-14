const ContainerMongoDb = require("../../containers/containerMongoDb");
const Producto = require('../../models/Producto');

class ProductoDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Producto);
    }

    static newProductDao() {
        return new ProductoDaoMongoDb();
    }
}

module.exports = ProductoDaoMongoDb;