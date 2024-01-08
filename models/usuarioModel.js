const conexion = require('./database.js');

const Usuario = {};

Usuario.validarUsername = (username, callback) => {
    conexion.query('SELECT * FROM usuario WHERE username = ?', [username], callback);
};

Usuario.registrar = (datosRegistro, callback) => {
    const registro = 'INSERT INTO usuario (username, passw, id_rol) VALUES (?, ?, ?)';
    conexion.query(registro, datosRegistro, callback);
};

Usuario.validarLogin = (datosLogin, callback) => {
    const login = 'SELECT * FROM usuario WHERE username = ? AND passw = ?';
    conexion.query(login, datosLogin, callback);
};

Usuario.getUsuarios = (callback) => {
    const usuarios = 'SELECT * FROM usuario INNER JOIN rol ON usuario.id_rol = rol.id_rol';
    conexion.query(usuarios, callback);
};

// Obtener los datos de un usuario en especifico y el rol
Usuario.getUsuario = (id, callback) => {
    const usuario = 'SELECT * FROM usuario INNER JOIN rol ON usuario.id_rol = rol.id_rol WHERE id_usuario = ?';
    conexion.query(usuario, [id], callback);
};

module.exports = Usuario;
