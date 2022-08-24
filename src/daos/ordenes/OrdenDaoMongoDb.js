const ContainerMongoDb = require("../../containers/containerMongoDb");
const { newCartDao } = require("../carritos/CarritoDaoMongoDb");
const Orden = require('../../models/Orden');
const { sumarTotal } = require('../../helpers/functions');

class OrdenDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Orden);
    }

    static newOrderDao() {
        return new OrdenDaoMongoDb();
    }
    async saveOrder(email) {
        try {
            const carrito = newCartDao();
            const data = await carrito.searchBy({email});
            const totalOrden = await this.getAll();
            const saveOrden = await this.save({
                numero_orden: ++totalOrden.length,
                email:data.email,
                productos: data.productos,
                total: await sumarTotal(data.productos)
            })
            await carrito.deleteById(data.id);
            if(!saveOrden) {
                throw new Error
            }
            return saveOrden;
        } catch (error) {
            return "No tiene Carrito creado";
        }
    }
}

module.exports = OrdenDaoMongoDb;