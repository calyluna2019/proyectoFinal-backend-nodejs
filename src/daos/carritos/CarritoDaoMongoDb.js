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
    async createCarrito(email) {
        try{
            const save = await this.save({productos:[],email});
            if(!save.email) {
                throw new Error;
            }
            return save;
        }
        catch(error){
            return "El email correspondiente ya tiene asignado un carrito";
        }
    }
    async saveProduct(productos, id_carrito) {
        try{
            const carrito = await this.getById(id_carrito);
            const productoCarrito = carrito.productos.findIndex(e => e.id === productos.id);
            if(productoCarrito > -1) {
                ++carrito.productos[productoCarrito].cantidad;
            } else {
                const producto = newProductDao();
                const prod = await producto.getById(productos.id);
                if (prod.id){
                    carrito.productos.push({
                        id:prod.id, 
                        nombre:prod.nombre, 
                        codigo:prod.codigo, 
                        descripcion:prod.descripcion,
                        precio: prod.precio,
                        cantidad: 1
                    });
                } else {
                    throw new Error("Id Producto Incorrecto");
                }
            }
            await this.updateById(id_carrito, carrito);
            return carrito;
        }
        catch(error){
            return error.message;
        }
    }
    async deleteProduct(id_producto, id_carrito) {
        try {
            const carrito = await this.getById(id_carrito);
            if(carrito.id) {
                const productoCarrito = carrito.productos.findIndex(e => e.id === id_producto);
                if(productoCarrito > -1) {
                    if(carrito.productos[productoCarrito].cantidad >= 2) {
                        --carrito.productos[productoCarrito].cantidad;
                    } else {
                        carrito.productos.splice(productoCarrito, 1);
                    }
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

module.exports = CarritoDaoMongoDb;