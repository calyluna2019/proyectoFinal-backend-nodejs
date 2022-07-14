const ContainerFirebase = require('../../containers/containerFirebase');
class ProductoDaoFirebase extends ContainerFirebase {
    constructor() {
        super('productos');
    }

    static newProductDao() {
        return new ProductoDaoFirebase();
    }
}

module.exports = ProductoDaoFirebase;