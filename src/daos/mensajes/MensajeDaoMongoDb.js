const ContainerMongoDb = require("../../containers/containerMongoDb");
const Mensaje = require('../../models/Mensaje');

class MensajeDaoMongoDb extends ContainerMongoDb {
    constructor() {
        super(Mensaje);
    }

    static newMensajeDao() {
        return new MensajeDaoMongoDb();
    }
}

module.exports = MensajeDaoMongoDb;