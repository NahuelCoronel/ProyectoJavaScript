let Usuarios = []; // Tu array de usuarios

async function cargarUsuarios() {
    try {
        const response = await fetch("usuarios.json");
        const data = await response.json();
        Usuarios = data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error de carga de la base de datos. Será solucionado en la brevedad",
            confirmButtonColor: '#007bff'
        });
    }
}

const succesLogIn = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

const htmlBodyLogIn = `
    <div id="encabezado-fijo">
        <h1>Cristina's Empanadas</h1>
        <p>Páginas de venta de empanadas y otras futuras variedades de comida</p>
    </div>

    <div id="login-container">
        <h2 id="tituloLogIn">Inicio de sesión</h2>
        <form id="formLogIn">
            <div>
                <label for="username">Email:</label><br>
                <input type="text" id="username" name="username">
            </div>
            <div>
                <label for="password">Contraseña:</label><br>
                <input type="password" id="password" name="password">
            </div>
            <button type="submit" id="logIn">Entrar</button>

        </form>
        <button type="button" id="register">Registrarse</button>
    </div>
`;

function iniciarSesion(event) {
    event.preventDefault();
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    let userInput = usernameInput.value;
    let existeUser = buscarUsuario(userInput, Usuarios);

    if (existeUser) {
        let indexUser = Usuarios.findIndex(usuario => usuario.user === userInput);
        let passUser = Usuarios[indexUser].password;
        let nombreApellido = Usuarios[indexUser].nombre + " " + Usuarios[indexUser].apellido;
        let passInput = passwordInput.value;

        if (passInput === passUser) {
            let botonRegistrarse = document.getElementById("register")
            botonRegistrarse.remove()
            let tituloInicioSesion = document.getElementById("tituloLogIn")
            tituloInicioSesion.remove()
            formLogIn.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 20px;">
            <p>🎉 ¡Usuario ${nombreApellido} bienvenido! 🎉</p>
            </div>
            `;
            succesLogIn.fire({
                icon: "success",
                title: "¡Inicio de sesión correcto!"
            });
            localStorage.setItem("usuario", nombreApellido);

        } else {
            Swal.fire({
                icon: "error",
                title: "Contraseña incorrecta. Intenta de nuevo.",
                confirmButtonColor: '#007bff'
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Usuario incorrecto. Reintente o regístrese.",
            confirmButtonColor: '#007bff'
        });
    }
}

function inicializarPantallaLogin() {
    const formIniciarSesion = document.getElementById("formLogIn");
    const botonRegistrarse = document.getElementById("register");

    if (formIniciarSesion) {
        formIniciarSesion.addEventListener("submit", iniciarSesion);
    }

    if (botonRegistrarse) {
        botonRegistrarse.addEventListener("click", () => {
            cargarPantallaRegistro();
        });
    }
}

function cargarPantallaLogin() {
    document.body.innerHTML = htmlBodyLogIn;
    inicializarPantallaLogin();
}

document.addEventListener('DOMContentLoaded', async () => {
    await cargarUsuarios();
    cargarPantallaLogin();
});


