const { OrdenDao } = require('../daos/index');
const order = OrdenDao.newOrderDao();
const {enviarEmail} = require('../utils/mailer');

async function getOrdenes(req, res) {
    const ordenEmail = req.user.email;
    const ordenes = await order.getAll({ordenEmail});
    res.status(201).json({ordenes});
}
async function guardarOrden(req, res) {
    const ordenEmail = req.user.email;
    const response = await order.saveOrder(ordenEmail);
    console.log(response)
    if (response.id) {
        await enviarEmail('nuevaOrden', 'Nueva orden', response)
        res.status(200).json({msg:"Orden creado.",response});
    } else {
        res.status(400).json({error:response});
    }
}

module.exports = {
    getOrdenes,
    guardarOrden
}