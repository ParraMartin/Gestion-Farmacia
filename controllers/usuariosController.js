const Usuario = require('../models/usuarioModel');

exports.getRegistro = (req, res) => {
    res.render('registro');
};

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getUsuarios = (req, res) => {
    Usuario.getUsuarios(function(error, results, fields) {
        if (error) {
            console.error('Error al obtener los usuarios:', error);
            res.status(500).send('Error interno del servidor');
        } else {
            res.render('usuarios', { usuarios: results });
        }
    });
};

exports.getInicio = (req, res) => {
    if (req.session.usuario) {
        res.render('inicio', { usuario: req.session.usuario });
    } else {
        res.status(403).send('Acceso denegado. Por favor, inicie sesión.');
    }
};

exports.postValidar = (req, res) => {
    const { username, password, rol } = req.body;
    const datosRegistro = [username, password, rol];

    Usuario.validarUsername(username, function(error, results, fields) {
        if (error) {
            console.error('Error en la validación del nombre de usuario:', error);
            res.status(500).send('Error interno del servidor');
        } else if (results.length > 0) {
            res.send('Nombre de Usuario ya registrado');
        } else {
            Usuario.registrar(datosRegistro, function(error, results, fields) {
                if (error) {
                    console.error('Error al registrar:', error);
                    res.status(500).send('Error interno del servidor');
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
        if (error) {
            console.error('Error en el login:', error);
            res.status(500).send('Error interno del servidor');
        } else if (results.length === 0) {
            res.send('Nombre de Usuario no registrado o contraseña incorrecta');
        } else {
            const { id_usuario, username, id_rol, tipo_rol } = results[0];

            req.session.usuario = {
                id_usuario,
                username,
                id_rol,
                tipo_rol
            };

            res.redirect('/inicio');
        }
    });
};
