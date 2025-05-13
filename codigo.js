function buscarUsuario(usuario,Usuarios){
    resultado = false
    for (i=0;i < Usuarios.length;i++){
        if (Usuarios[i].user === usuario){
            resultado = true
            return resultado
        }
    }
}

function registrarUsuario(Usuarios){
    usuarioUnico = false
    do {
        nuevoUsuario = prompt("Por favor ingrese su usuario.")
        if (!buscarUsuario(nuevoUsuario,Usuarios)){
            console.log("Usuario creado exitosamente")
            usuarioUnico = true
        }
        else{
            alert("Usuario ya existente, por favor ingrese otro usuario.")
        }
    }while (!usuarioUnico)
    
    Usuarios.push({
        user:nuevoUsuario,
        password:prompt("Por favor ingrese su contraseña."),
        nombre:prompt("Por favor ingrese su nombre."),
        apellido:prompt("Por favor ingrese su apellido."),
        celular:parseInt(prompt("Por favor ingrese su celular.")),
        fechaNacimiento:prompt("Por favor ingrese su fecha de nacimiento (dd/mm/yyyy).")
        
    })

    iniciarSesion()
    
}



let Usuarios = []

let CarritoCompras = []

Usuarios.push({
    user:"nahuelcoronel22@outlook.com",
    password:"Nahuel22",
    nombre:"Nahuel",
    apellido:"Coronel",
    celular:1120558924,
    fechaNacimiento:"04/09/2000"
})



const NombreEmpresa = "Cristina´s Empanadas"

let confirmaIncio = confirm("Te damos la bienvenida a " + NombreEmpresa + ".\n\n¿Desea iniciar sesión?")

if (confirmaIncio){
    iniciarSesion()
}
else {
    alert("Muchas gracias por la visita, lo esperamos en un futuro.")
}


function iniciarSesion(){
    let poseeUsuario = prompt("¿Eres un usuario registrado?\n-Si\n-No").toLowerCase()
    let reintento
    let logueado = false
    if (poseeUsuario === "si"){
        do {
            userInput = prompt("Por favor ingrese su usuario").toLowerCase()
            existeUser = buscarUsuario(userInput,Usuarios)
            if (existeUser){
                indexUser = Usuarios.findIndex(usuario => usuario.user === userInput)
                passUser = Usuarios[indexUser].password
                boolLogIn = false
                for (i=1;i<=3;i++){
                    passInput = prompt("Por favor ingrese su contraseña")
                    if (passInput === passUser){
                        boolLogIn = true
                        alert("Sesión iniciada correctamente.")
                        logueado = true
                        break
                    }
                    else{
                        alert("Contraseña erronea. Vuelva a intentar nuevamente")
                    }
                }
                if (!boolLogIn){
                    alert("Ha alcanzado el límite de intentos.")
                }
                
            }
            else{
                alert("Usuario ingresado no existe")
                reintento = prompt("¿Desea reintentar o registrarse?\n1-Reintentar\n2-Registrarse\n\n(Ingrese solo el número de la opción que desea.").toLowerCase()
                if (reintento == "2"){
                    registrarUsuario(Usuarios)
                }
            }  
        } while(reintento === "1" && !logueado);
    }
    else if (poseeUsuario === "no"){
        registrarUsuario(Usuarios) 
    }
}







        
        
             


