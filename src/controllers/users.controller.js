const { UserDao } = require('../daos/index');
const user = UserDao.newUserDao();
const {enviarEmail} = require('../utils/mailer');

async function getUser(req, res) {
    const userEmail = req.user.email;
    const {password, id, nombre, direccion, edad, telefono, email, rol} = await user.searchBy({email:userEmail});
    res.status(201).json({id, nombre, direccion, edad, telefono, email, rol});
}
async function saveUser(req, res) {
    const data = req.body;
    const saveProd = await user.save(data);
    if(saveProd.id) {
        await enviarEmail('nuevoUsuario', 'Nuevo registro', data)
        res.status(201).json({msg: 'Registro Exitoso!',id:saveProd.id});
    } else {
        res.status(400).json({error:"Usuario ya existe"});
    }
}

async function updateUser(req, res) {
    const idUser = req.params.id;
    const usuario = await user.getById(idUser);
    if (usuario.id) {
        const {password, id, nombre, direccion, edad, telefono, email, rol} = await user.updateById(idUser, req.body);
        res.status(200).json({id, nombre, direccion, edad, telefono, email, rol});
    } else {
        res.status(400).json({error:usuario});
    }
}

module.exports = {
    getUser,
    saveUser,
    updateUser
}