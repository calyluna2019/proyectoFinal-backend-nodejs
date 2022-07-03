class Producto {

    constructor() {
        this.fs = require('fs').promises;
        this.pathFile = 'src/databases/productos.json';
    }
    
    static newProduct() {
        return new Producto();
    }

    async save(producto){
        try {
            let id;
            const todos = await this.getAll();
            if(todos.length>0){
                const ultim = todos.find((e) => {
                    return todos[todos.length - 1].id == e.id;
                })
                id = ultim.id + 1;
            } else {
                id = 1;
            }
            producto.timestamp = Date.now();
            const prod = {...producto, id}
            todos.push(prod);
            this.fs.writeFile(this.pathFile, JSON.stringify(todos));
            return producto.id;
            
        } catch (error) {
            return `Error al guardar un producto: ${error}`;
        }
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
    async updateById(id, producto){
        try{
            const productos = await this.getAll();
            const byId = productos.findIndex(p => p.id === id);

            producto.timestamp = Date.now();
            producto.id = id;
            productos[byId] = producto;
            await this.fs.writeFile(this.pathFile,JSON.stringify(productos));
        }
        catch(error){
            return `Hubo un error "${error}"`
        }
    }
    async getAll() {
        try {
            const productos = await this.fs.readFile(this.pathFile, 'utf-8');
            return JSON.parse(productos);
        } catch (error) {
            return `Error al obtener los productos: ${error}`;
        }
    }
}

module.exports = Producto;

