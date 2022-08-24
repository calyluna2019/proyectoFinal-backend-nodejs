const { MensajeDao } = require('../daos/index');
const message = MensajeDao.newMensajeDao();

async function getMensajes(req, res) {
    const email = req.params.email || null;
    const emailMensajes = await message.getAll({email});
    if(emailMensajes.length > 0) {
        res.status(200).json(emailMensajes);
    } else {
        res.status(400).json({error:'el siguiente email no contiene mensajes'});
    }
}
async function saveMensaje(req, res) {
    const mensajes = req.body;
    mensajes.tipo = req.user.rol === "ADMIN"? "sistema": "usuario";
    const saveMensaje = await message.save(mensajes);
    if(saveMensaje.id) {
        res.status(201).json({msg: 'Registro Exitoso!',id:saveMensaje.id});
    } else {
        res.status(400).json({error:saveMensaje});
    }
}

module.exports = {
    getMensajes,
    saveMensaje
}