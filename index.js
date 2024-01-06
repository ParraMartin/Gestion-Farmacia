// -> Importaciones
const express = require('express');
const usuariosController = require('./controllers/usuariosController');

// -> Configuraciones
const app = express();

// -> Middlewares
app.set('view engine', 'ejs');
app.use(express.json());

// -> Rutas
app.use(express.static('public'));
app.use(express.static('controllers'));
app.use(express.urlencoded({ extended: false }));

// -> Metodos HTTP - GET, POST, PUT, DELETE
app.get('/', usuariosController.getRegistro);
app.get('/login', usuariosController.getLogin);
app.get('/usuarios', usuariosController.getUsuarios);

app.post('/login', usuariosController.postLogin);
app.post('/validar', usuariosController.postValidar);

// -> Servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en http://localhost:3000');
});
