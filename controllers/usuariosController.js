const Usuario = require('../models/usuarioModel');

exports.getRegistro = (req, res) => {
    res.render('registro');
};

exports.getLogin = (req, res) => {
    res.render('login');
}

exports.getUsuarios = (req, res) => {
    Usuario.getUsuarios(function(error, results, fields) {
        if (error) {
            res.send('Error al obtener los usuarios');
        } else {
            res.render('usuarios', { usuarios: results });
        }
    });
}

exports.postValidar = (req, res) => {
    const { username, password, rol } = req.body;
    const datosRegistro = [username , password, rol];

    Usuario.validarUsername(username, function(error, results, fields) {
        if (error || results.length > 0) {
            res.send('Error o Nombre de Usuario ya registrado');
        } else {
            Usuario.registrar(datosRegistro, function(error, results, fields) {
                if (error) {
                    res.send('Error al registrar');
                    res.redirect('/registro');
                } else {
                    res.redirect('/login');
                }
            });
        }
    });
};

exports.postLogin = (req, res) => {
    const { username, password } = req.body;
    const datosLogin = [username, password];

    Usuario.validarLogin(datosLogin, function(error, results, fields) {
        if (error || results.length === 0) {
            res.send('Error o Nombre de Usuario no registrado');
        } else {
            res.redirect('/usuarios')
        }
    });
};
