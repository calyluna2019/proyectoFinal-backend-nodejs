const Producto = require('../models/Producto');
class Carrito {

    constructor() {
        this.fs = require('fs').promises;
        this.pathFile = 'src/databases/carritos.json';
    }

    static newCarrito() {
        return new Carrito();
    }

    async createCarrito() {
        try{
            let carrito = {};
            const todos = await this.getAll();
            let id;
            if(todos.length>0){
                const ultim = todos.find((e) => {
                    return todos[todos.length - 1].id == e.id;
                })
                id = ultim.id + 1;
            } else {
                id = 1;
            }
            carrito.productos = [];
            carrito.id = id;
            carrito.timestamp = Date.now();
            const carritos = await this.getAll();
            carritos.push(carrito);
            await this.fs.writeFile(this.pathFile,JSON.stringify(carritos));
            return carrito.id;
        }
        catch(error){
            return `Se produjo un error: ${error}`
        }
    }
    async saveProduct(productos, id_carrito) {
        try{
            const carrito = await this.getById(id_carrito);
            const producto = new Producto();
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
        const carrito = await this.getById(id_carrito);
        let productos = carrito.productos;
        const index = productos.findIndex(p => p.id === id_producto);
        productos.splice(index, 1);
        carrito.productos = productos;

        await this.updateById(id_carrito, carrito);
    }
    async getById(id) {
        try {
            const todos = await this.getAll();
            const byId = todos.find((e)=>e.id === id);
            if(byId) {
                return byId;
            } else {
                throw new Error("Error: Id incorrecto");
            }
        } catch (error) {
            return error.message
        }
    }

    async deleteById(id) {
        try {
            const todos = await this.getAll();
            const byId = todos.findIndex((e)=>e.id === id);
            if(byId > -1){
                todos.splice(byId,1)
                await this.fs.writeFile(this.pathFile, JSON.stringify(todos));
            } else {
                throw new Error("Id incorrecto");
            }
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }

    async updateById(id, carrito) {
        try{
            const carritos = await this.getAll();
            const byId = carritos.findIndex(p => p.id === id);

            carrito.timestamp = Date.now();
            carrito.id = id;
            carritos[byId] = carrito;
            await this.fs.writeFile(this.pathFile,JSON.stringify(carritos));
        }
        catch(error){
            return `Se produjo un error: ${error}`
        }
    }

    async getAll() {
        try{
            const carrito = await this.fs.readFile(this.pathFile,'utf-8');
            const carritoParse = JSON.parse(carrito);
            return carritoParse.map(p => p);
        }
        catch(error){
            return `Se produjo un error: ${error}`;
        }
    }
}

const carrito = Carrito.newCarrito();

module.exports = Carrito