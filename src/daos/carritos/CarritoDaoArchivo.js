const ContainerArchivo = require("../../containers/containerArchivo");
const {newProductDao} = require('../productos/ProductoDaoArchivo');

class CarritoDaoArchivo extends ContainerArchivo {
    constructor() {
        super('carritos.json');
    }
    
    static newCartDao() {
        return new CarritoDaoArchivo();
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
                let productos = carrito.productos;
                const index = productos.findIndex(p => p.id === id_producto);
                if(index > -1) {
                    productos.splice(index, 1);
                    carrito.productos = productos;
                    await this.updateById(id_carrito, carrito);
                    return carrito;
                } else {
                    throw new Error("Id Producto Incorrecto");
                }
            } else {
                throw new Error("Id Carrito Incorrecto");
            }
            
        } catch (error) {
            return error.message;
        }
    }
}

module.exports = CarritoDaoArchivo;