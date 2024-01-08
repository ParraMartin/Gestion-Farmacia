// Importaciones
const express = require('express');
const session = require('express-session');
const usuariosController = require('./controllers/usuariosController');

// Inicialización de Express
const app = express();

// Configuración de la sesión
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: 'auto',
        httpOnly: true, 
        maxAge: 3600000 
    }
}));

// Configuraciones de Express y Middlewares
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Rutas
app.get('/', usuariosController.getLogin);
app.get('/registro', usuariosController.getRegistro);
app.get('/usuarios', usuariosController.getUsuarios);
app.get('/inicio', usuariosController.getInicio);
app.post('/login', usuariosController.postLogin);
app.post('/validar', usuariosController.postValidar);

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});
