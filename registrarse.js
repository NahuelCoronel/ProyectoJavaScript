async function mensajeRegistroExitoso(nuevoUsuario) {
    await Swal.fire({
        title: "🎉 ¡Usuario " + nuevoUsuario + " registrado exitosamente! 🎉",
        text: "Será redireccionado al Inicio de Sesión.",
        icon: "success",
        confirmButtonColor: '#007bff'
    });
}

async function registrarUsuario(event, Usuarios) {
    event.preventDefault();
    let usernameInput = document.getElementById("usernameRegister");
    let passwordInput = document.getElementById("passwordRegister");
    let nameInput = document.getElementById("nameRegister");
    let lastNameInput = document.getElementById("lastNameRegister");
    let cellRegister = document.getElementById("cellRegister");
    let birthDateRegister = document.getElementById("birthDateRegister");
    let nuevoUsuario = usernameInput.value;

    if (!buscarUsuario(nuevoUsuario, Usuarios)) {
        Usuarios.push({
            user: nuevoUsuario,
            password: passwordInput.value,
            nombre: nameInput.value,
            apellido: lastNameInput.value,
            celular: parseInt(cellRegister.value),
            fechaNacimiento: birthDateRegister.value
        });

        await mensajeRegistroExitoso(nuevoUsuario);
        cargarPantallaLogin();
    } else {
        Swal.fire({
            icon: "error",
            title: "Usuario/correo ya existente.",
            text: "Intente con un nuevo correo.",
            confirmButtonColor: '#007bff'
        });
    }
}

const htmlBodyRegistrar = `
<div id="encabezado-fijo">
        <div class="header-content"> <h1>Cristina's Empanadas</h1>
            <p>Páginas de venta de empanadas y otras futuras variedades de comida</p>
        </div>
</div>
<div id="login-container">
    <h2>Registro de usuario</h2>
    <form id="formRegistrar">
        <div>
            <label for="username">Email:</label><br>
            <input type="text" id="usernameRegister" name="username" required>
        </div>
        <div>
            <label for="password">Contraseña:</label><br>
            <input type="password" id="passwordRegister" name="password" required>
        </div>
        <div>
            <label for="name">Nombre:</label><br>
            <input type="text" id="nameRegister" name="name" required>
        </div>
        <div>
            <label for="lastName">Apellido:</label><br>
            <input type="text" id="lastNameRegister" name="lastName" required>
        </div>
        <div>
            <label for="cell">Celular:</label><br>
            <input type="text" id="cellRegister" name="cell" required>
        </div>
        <div>
            <label for="birhtDate">Fecha de cumpleaños:</label><br>
            <input type="date" id="birthDateRegister" name="birthDate" required>
        </div>
        <button type="submit" id="registerUser">Registrarse</button>
    </form>
</div>
`;

function inicializarPantallaRegistro() {
    const formRegistrarUSuario = document.getElementById("formRegistrar");
    const backToLoginButton = document.getElementById("backToLogin");

    if (formRegistrarUSuario) {
        formRegistrarUSuario.addEventListener("submit", async (event) => {
            await registrarUsuario(event, Usuarios);
        });
    }

    if (backToLoginButton) {
        backToLoginButton.addEventListener("click", () => {
            cargarPantallaLogin();
        });
    }
}

function cargarPantallaRegistro() {
    document.body.innerHTML = htmlBodyRegistrar;
    inicializarPantallaRegistro();
}

function buscarUsuario(usuario, Usuarios) {
    for (let i = 0; i < Usuarios.length; i++) {
        if (Usuarios[i].user === usuario) {
            return true;
        }
    }
    return false;
}