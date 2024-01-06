window.addEventListener('DOMContentLoaded', (event) => {
    const passwordEquals = (password, password2) => {
        return password === password2;
    };

    const validarPassw = () => {
        // Obtener los datos del formulario de contraseña y confirmar contraseña
        const password = document.getElementById('password');
        const password2 = document.getElementById('password2');

        if (password && password2) {
            if (!passwordEquals(password.value, password2.value)) {
                // Si las contraseñas no coinciden, mostrar un mensaje de error
                password2.setCustomValidity('Las contraseñas no coinciden');
            } else {
                // Limpiar el mensaje de error si las contraseñas coinciden
                password2.setCustomValidity('');
            }
        } else {
            console.error('Elementos de contraseña no encontrados');
        }
    }

    // Inicializar el evento de validación de contraseña
    const password2 = document.getElementById('password2');
    if (password2) {
        password2.addEventListener('input', validarPassw);
    } else {
        console.error('Elemento password2 no encontrado');
    }

    console.log('registro.js cargado');
});
