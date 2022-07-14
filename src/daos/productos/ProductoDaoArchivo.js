const ContainerArchivo = require("../../containers/containerArchivo");

class ProductoDaoArchivo extends ContainerArchivo {
    constructor() {
        super('productos.json');
    }
    
    static newProductDao() {
        return new ProductoDaoArchivo();
    }
}

module.exports = ProductoDaoArchivo;