import { actividades } from "./actividadesModales";
/**lógica para mostrar las actividades en los modales de la página principal */

//Elementos del modal
const modal = document.getElementById('modal-actividad');
const modalTitulo = document.getElementById('modal-titulo');
const modalFecha = document.getElementById('modal-fecha');
const modalHora = document.getElementById('modal-hora');
const modalUbicacion = document.getElementById('modal-ubicacion');
const modalDescripcion = document.getElementById('modal-descripcion');
const botonCerrarModal = document.querySelector('.actividad-modal__cerrar');

//Funciones
const mostrarModal = (actividad) => {
    modalTitulo.textContent = ` ${actividad.nombre}`;
    modalFecha.textContent = ` ${actividad.dia}`;
    modalHora.textContent = ` ${actividad.hora}`;
    modalUbicacion.textContent = ` ${actividad.ubicacion}`;
    modalDescripcion.textContent = ` ${actividad.descripcion}`;
    //hacemos visible el modal
    modal.classList.add('actividad-modal-visible');
};

const cerrarModal = () =>{
    modal.classList.remove('actividad-modal-visible');
};

export const initModal = () => {
    const cartasDeActividades = document.querySelectorAll('.actividades__contenedor > div');
    cartasDeActividades.forEach((carta,indice) => {
        carta.addEventListener('click', () => {
            const actividadSeleccionada = actividades[indice];
            if (actividadSeleccionada) {
                mostrarModal(actividadSeleccionada);
            }
        });
    });
    //añadimos otro evento para cerrar el modal
    botonCerrarModal.addEventListener('click', cerrarModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

