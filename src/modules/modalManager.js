import { getListaDeEventos } from "./eventManager";

const listaDeEventos = getListaDeEventos();

//Elementos del modal
const modal = document.getElementById('modal-actividad');
const modalTitulo = document.getElementById('modal-titulo');
const modalFecha = document.getElementById('modal-fecha');
const modalHora = document.getElementById('modal-hora');
const modalUbicacion = document.getElementById('modal-ubicacion');
const modalDescripcion = document.getElementById('modal-descripcion');
const botonCerrarModal = document.querySelector('.actividad-modal__cerrar');

//Funciones
const mostrarModal = (e) =>{
    modalTitulo.textContent = ` ${e.nombre}`;
    modalFecha.textContent = ` ${e.dia}`;
    modalHora.textContent = ` ${e.hora}`;
    modalUbicacion.textContent = ` ${e.ubicacion}`;
    modalDescripcion.textContent = ` ${e.descripcion}`;

    //hacemos visible el modal
    modal.classList.add('actividad-modal-visible');
};

const cerrarModal = () =>{
    modal.classList.remove('actividad-modal-visible');
};

export const initModal = () =>{
    const cartasDeActividades = document.querySelectorAll('.actividades__contenedor > div');
    
    cartasDeActividades.forEach(carta =>{
        carta.addEventListener('click', () =>{
            const cartaId = carta.dataset.id; // guardamos el id del div correpondiente
            const eventoSeleccionado = listaDeEventos.find(evento => evento.id === cartaId );

            if (eventoSeleccionado) {
                mostrarModal(eventoSeleccionado);
            };
            
        });
    });

    //añadimos otro evento para cerrar el modal
    botonCerrarModal.addEventListener('click',cerrarModal);
    modal.addEventListener('click', (e) => { //para cerrar el modal sin necesidad de pulsar la 'X' de la esquina;
        if (e.target === modal) {
            cerrarModal();
        }
    });
}

