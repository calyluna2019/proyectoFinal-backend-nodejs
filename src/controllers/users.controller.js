const { UserDao } = require('../daos/index');
const user = UserDao.newUserDao();
const {enviarEmail} = require('../utils/mailer');

async function saveUser(req, res) {
    const data = req.body;
    const userExists = await user.getByColumn(data.email);
    const saveProd = await user.save(data);
    if(saveProd.id) {
        await enviarEmail('nuevoUsuario', 'Nuevo registro', data)
        res.status(201).json({msg: 'Registro Exitoso!',id:saveProd.id});
    } else {
        res.status(400).json({error:"Usuario ya existe"});
    }
}

module.exports = {
    saveUser
}