let Usuarios = []

let CarritoCompras = []

Usuarios.push({
    user: "nahuelcoronel22@outlook.com",
    password: "Nahuel22",
    nombre: "Nahuel",
    apellido: "Coronel",
    celular: 1120558924,
    fechaNacimiento: "04/09/2000"
})

let htmlBodyRegistrar = `
<h1>Cristina's Empanadas</h1>
<p>Páginas de venta de empanadas y otras futuras variedades de comida</p>

<h2>Registro de usuario</h2>

<form id="formRegistrar">
    <div>
        <label for="username">Email:</label><br>
        <input type="text" id="usernameRegister" name="username" required>
    </div>
    <p id="messageUser"></p>

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
`;

let htmlBodyLogIn = `
    <h1>Cristina's Empanadas</h1>
    <p>Páginas de venta de empanadas y otras futuras variedades de comida</p>

    <div id="login-container">
        <h2>Inicio de sesión</h2>
    
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
    
            <p id="message"></p>
        </form>
        <button type="button" id="register">Registrarse</button>
    </div>
`;

class Empanada {
    constructor(sabor, precio, ingredientes, id) {
        this.sabor = sabor;
        this.precio = precio;
        this.ingredientes = ingredientes;
        this.id = id;
    }
}
// Creación de las empanadas m

// Empanada de Carne (ya la tenías, la incluimos aquí)
const empanadaCarne = new Empanada("Carne", 1500, ["Carne", "Cebolla", "Morron", "Aceituna"], 1);

// Empanada de Pollo
const empanadaPollo = new Empanada("Pollo", 1500, ["Pollo", "Cebolla", "Morron"], 2);

// Empanada de Jamón y Queso
const empanadaJyQ = new Empanada("Jamón y Queso", 1400, ["Jamón", "Queso Mozzarella", "Orégano"], 3);

// Empanada de Verdura
const empanadaVerdura = new Empanada("Verdura", 1450, ["Acelga", "Salsa Blanca", "Nuez Moscada"], 4);

// Empanada de Humita
const empanadaHumita = new Empanada("Humita", 1600, ["Choclo Cremoso", "Cebolla", "Pimentón"], 5);


const listaDeEmpanadas = [empanadaCarne, empanadaPollo, empanadaJyQ, empanadaVerdura, empanadaHumita]

const NombreEmpresa = "Cristina´s Empanadas"


function buscarUsuario(usuario, Usuarios) {
    resultado = false
    for (i = 0; i < Usuarios.length; i++) {
        if (Usuarios[i].user === usuario) {
            resultado = true
            return resultado
        }
    }
}

function registrarUsuario(event,Usuarios) {
    event.preventDefault()
    usuarioUnico = false
    let formRegister = document.getElementById("formRegistrar"); // ID del formulario de login
    let usernameInput = document.getElementById("usernameRegister"); // ID del input de usuario
    let passwordInput = document.getElementById("passwordRegister"); // ID del input de contraseña
    let nameInput = document.getElementById("nameRegister");
    let lastNameInput = document.getElementById("lastNameRegister");
    let cellRegister = document.getElementById("cellRegister");
    let birthDateRegister = document.getElementById("birthDateRegister");
    let messageUser = document.getElementById("messageUser");
    nuevoUsuario = usernameInput.value
    console.log(nuevoUsuario)
    if (!buscarUsuario(nuevoUsuario, Usuarios)) {
        usuarioUnico = true
        Usuarios.push({
            user: nuevoUsuario,
            password: passwordInput.value,
            nombre: nameInput.value,
            apellido: lastNameInput.value,
            celular: parseInt(cellRegister.value),
            fechaNacimiento: birthDateRegister.value

        })
        console.log(Usuarios)
        formRegister.innerHTML = `
                    <div id="usuarioCreado" class="success-message" style="text-align: center; padding: 20px;">
                        <p>🎉 ¡Usuario "${nuevoUsuario}" registrado exitosamente! 🎉</p>
                        <p>Haciendo click en "Ir a Iniciar Sesión" será redireccionado para que pueda loguearse.</p>
                        <button type="button" id="IrLogInBtn">Ir a Iniciar Sesión</button>
                    </div>
                `;
        const irLogInBtn = document.getElementById("IrLogInBtn");
        if (irLogInBtn) {
            irLogInBtn.addEventListener("click", () => {
                document.body.innerHTML = htmlBodyLogIn
                paginaPrincipal()


            });
        }
    }
    else {
        messageUser.textContent = "Usuario ya existente. Intente de nuevo.";
        messageUser.style.color = "red"; // Estilo en línea
        messageUser.style.fontWeight = "bold"; // Para que se destaque
        messageUser.className = "error-message"; // Opcional: añadir una clase para CSS y/o para facilitar su eliminación
    }

}



function iniciarSesion() {
    event.preventDefault()
    const formLogIn = document.getElementById("formLogIn"); // ID del formulario de login
    const usernameInput = document.getElementById("username"); // ID del input de usuario
    const passwordInput = document.getElementById("password"); // ID del input de contraseña
    let userInput = usernameInput.value
    existeUser = buscarUsuario(userInput, Usuarios)
    if (existeUser) {
        indexUser = Usuarios.findIndex(usuario => usuario.user === userInput)
        passUser = Usuarios[indexUser].password
        nombreApellido = Usuarios[indexUser].nombre + " " + Usuarios[indexUser].apellido
        boolLogIn = false
        passInput = passwordInput.value
        if (passInput === passUser) {
            boolLogIn = true
            let botonRegistrarse = document.getElementById("register")
            botonRegistrarse.remove()
            formLogIn.innerHTML = `
                    <div class="success-message" style="text-align: center; padding: 20px;">
                        <p>🎉 ¡Usuario ${nombreApellido} bienvenido, ha ingresado correctamente! 🎉</p>
                    </div>
                `;
            logueado = true
            localStorage.setItem("usuario", nombreApellido)

        }
        else {
            // 1. Crear un nuevo elemento <p>
            const errorMessage = document.getElementById("message")

            // 2. Asignarle texto y estilo
            errorMessage.textContent = "Contraseña incorrecta. Intenta de nuevo.";
            errorMessage.style.color = "red"; // Estilo en línea
            errorMessage.style.fontWeight = "bold"; // Para que se destaque
            errorMessage.className = "error-message"; // Opcional: añadir una clase para CSS y/o para facilitar su eliminación


        }
    }
    else {
        const errorMessage = document.getElementById("message")

        // 2. Asignarle texto y estilo
        errorMessage.textContent = "Usuario incorrecto. Reintente o regístrese.";
        errorMessage.style.color = "red"; // Estilo en línea
        errorMessage.style.fontWeight = "bold"; // Para que se destaque
        errorMessage.className = "error-message"; // Opcional: añadir una clase para CSS y/o para facilitar su eliminación

    }
}


function paginaPrincipal() {
    let formIniciarSesion = document.getElementById("formLogIn")
    let botonRegistrarse = document.getElementById("register")


    formIniciarSesion.addEventListener("submit", iniciarSesion)

    botonRegistrarse.addEventListener("click", () => {
        document.body.innerHTML = htmlBodyRegistrar
        let formRegistrarUSuario = document.getElementById("formRegistrar")
        formRegistrarUSuario.addEventListener("submit",(Event)=>{
            registrarUsuario(Event,Usuarios)
        })
    })
    
}

paginaPrincipal()



