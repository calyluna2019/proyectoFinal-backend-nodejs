const ContainerMongoDb = require("../../containers/containerMongoDb");
const {newProductDao} = require('../productos/ProductoDaoMongoDb');
const Carrito = require('../../models/Carrito');

class CarritoDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Carrito);
    }

    static newCartDao() {
        return new CarritoDaoMongoDb();
    }
    async createCarrito() {
        try{
            const save = this.save({productos:[]});
            return save;
        }
        catch(error){
            return `Se produjo un error: ${error}`
        }
    }
    async saveProduct(productos, id_carrito) {
        try{
            const carrito = await this.getById(id_carrito);
            const producto = newProductDao();
            for(const product of productos){
                const prod = await producto.getById(product.id);
                if (prod){
                    carrito.productos.push(prod);
                }
            }
            await this.updateById(id_carrito, carrito);
        }
        catch(error){
            return `Se produjo un error: ${error}`
        }
    }
    async deleteProduct(id_producto, id_carrito) {
        try {
            const carrito = await this.getById(id_carrito);
            if(carrito.id) {
                carrito.productos.pull(id_producto);
                await this.updateById(id_carrito, carrito);
                return carrito;
            } else {
                throw new Error("Id Carrito Incorrecto");
            }
            
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = CarritoDaoMongoDb;