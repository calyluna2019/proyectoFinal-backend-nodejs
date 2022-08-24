const postLogin = (req, res) => {
    const {password, nombre, direccion, email, rol} = req.user;
    res.send({nombre,direccion,email,rol});
};

const getFailLogin = (req, res) => {
    res.send({message: "Usuario y/o contraseña incorrecta"});
};

const logout = (req, res) => {
    if (req.user != undefined) {
        const name = req.user.nombre;
        req.session.destroy(() => {
            req.session = null;
            res.send({userName: name,message: "Cerro session"});
        });
    }else{
        res.send({message: "expiro su session"}); 
    }
}

module.exports = {
    postLogin,
    getFailLogin,
    logout
}