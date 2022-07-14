const ContainerFirebase = require('../../containers/containerFirebase');
const {newProductDao} = require('../productos/ProductoDaoFirebase');
class CarritosDaoFirebase extends ContainerFirebase {
    constructor() {
        super('carritos');
    }

    static newCartDao() {
        return new CarritosDaoFirebase();
    }
    async createCarrito() {
        try{
            const save = this.save({productos:[]});
            return save;
        }
        catch(error){
            return `Se produjo un error: ${error}`;
        }
    }
    async saveProduct(products, cart_id){
        try{
            const producto = newProductDao();
            const carrito = await this.getById(cart_id);
            const productos = carrito.productos?? [];
            for(const p of products){
                const encontrado = productos.findIndex(x => (x.id === p.id));
                if (encontrado < 0){
                    const prod = await producto.getById(p.id);
                    productos.push(prod);
                }
            }
            await this.updateById(cart_id,{productos})
        }
        catch(e){
            return `Hubo un error al actualizar el carrito: "${e}"`
        }
    }

    async deleteProduct(product_id, cart_id){
        const carrito = await this.getById(cart_id);
        let productos = carrito.productos;
        const index = productos.findIndex(p => p.id === product_id);
        productos.splice(index, 1);
        await this.updateById(cart_id,{productos})

    }
}

module.exports = CarritosDaoFirebase
