async function cargarEmpanadas() {
    try {
        const response = await fetch("empanadas.json");
        const data = await response.json();
        return data;
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Error de carga de la base de datos. Será solucionado en la brevedad",
            confirmButtonColor: '#007bff'
        });
    }
}

function crearElementoEmpanada(empanada) {
    const divEmpanada = document.createElement('div');
    divEmpanada.classList.add('empanada-item'); // Clase para estilos CSS

    divEmpanada.innerHTML = `
        <img src="${empanada.imagen}" alt="${empanada.sabor}">
        <h3>${empanada.sabor}</h3>
        <p>${empanada.ingredientes}</p>
        <p class="precio">$${empanada.precio}</p>
    `;
    return divEmpanada;
}

function agregarEmpanadas(Empanadas) {
    const contenedorPrincipal = document.getElementById('lista-empanadas');
    const EMPANADAS_POR_GRUPO = 5;

    contenedorPrincipal.innerHTML = '';
    let grupoActualDiv = null;

    Empanadas.forEach((empanada, index) => {
        if (index % EMPANADAS_POR_GRUPO === 0) {
            grupoActualDiv = document.createElement('div');
            grupoActualDiv.classList.add('empanada-grupo');
            contenedorPrincipal.appendChild(grupoActualDiv);
        }
        const elementoEmpanada = crearElementoEmpanada(empanada);
        grupoActualDiv.appendChild(elementoEmpanada);
    });
}



document.addEventListener('DOMContentLoaded', async () => {
    const EmpanadasCargadas = await cargarEmpanadas();
    
    if (EmpanadasCargadas && EmpanadasCargadas.length > 0) {
        agregarEmpanadas(EmpanadasCargadas);
    } else {
        const contenedorPrincipal = document.getElementById('lista-empanadas');
        if (contenedorPrincipal) {
            contenedorPrincipal.innerHTML = '<p>Lo sentimos, no hay empanadas disponibles en este momento.</p>';
        }
    }
});

const botonDeslogueo = document.getElementById("logout-btn")
const usernameDisplay = document.getElementById('username-display');
const usuarioLogueado = localStorage.getItem('usuario')

usernameDisplay.textContent = "Usuario: " + usuarioLogueado

botonDeslogueo.addEventListener("click",()=>{
    Swal.fire({
        title:"¿Estas seguro de que desea cerrar sesión?",
        icon:"warning",
        showCancelButton: true,
        confirmButtonColor: '#007bff', 
        cancelButtonColor: '#dc3545', 
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                localStorage.removeItem('usuario');
                window.location.href = 'index.html';
            }

    })
})