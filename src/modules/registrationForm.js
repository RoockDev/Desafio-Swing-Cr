
import { getListaDeEventos } from './eventManager.js';

const listaDeEventos = getListaDeEventos(); 

const diaSelect = document.getElementById('dia-select');
const horaSelect = document.getElementById('hora-select');

diaSelect.addEventListener('change',() =>{
    //obtenemos el dia seleccionada
    const diaSeleccionado = diaSelect.value; 

    //Limpiamos el select de la hora antes de seleccionarlo por si el usuario cambia de idea
    horaSelect.innerHTML = '<option value="">--Por favor, elige una hora--</option>';
    if (!diaSeleccionado) {
        return; //por si el usuario cambia de idea y deselecciona el dia no hacemos nada
    }

    const eventosDelDia = listaDeEventos.filter(evento => evento.dia.toLowerCase() === diaSeleccionado);

    /**
     * utilizamos flatMap en vez de map por que algunas actividades, en vez de tener una hora fija
     * tiene un array de distintas horas como por ejemplo las clases del sabado y del domingo
     * y con flatmap podemos aplanar el array para asi poder mostrar todsas las horas para poder 
     * elegir en el formulario
     */
    const todasLasHoras = eventosDelDia.flatMap(evento => evento.hora);
    /**
     * Aqui utilizamos set porque no queremos horas duplicadas y set devuelve un array sin duplicados
     */
    const horasUnicas = [...new Set(todasLasHoras)];
    horasUnicas.forEach(hora =>{
        const option = document.createElement('option');
        option.value = hora;
        option.textContent = hora;
        horaSelect.appendChild(option);
    });
});