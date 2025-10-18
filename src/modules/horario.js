export const generarBloqueHoras = (idContenedor, horaInicio, horaFin) => {
    
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) {
        return;         //si por lo que sea no existe el contenedor se va
    };

    //ahora quiero recorrer todas las horas
    for(let hora = horaInicio; hora <= horaFin; hora++){
        const horadDiv = document.createElement('div');

        //para aplicarle estilos
        horadDiv.classList.add('hora-etiqueta');

        /**ahora formateamos por si acaso se mete un hora que por ejemplo sea 8
         * pues queremos que salga 08:00, vamos dos digitos y padstart el primer numero
         * dentro del parentesis indica la cantidad de digitos que se quiere
         * y el 0 con lo que queremos que se rellene si ponemos menos de 2 digitos
         */

        const horaFormateada = `${String(hora).padStart(2,'0')}:00`;
        horadDiv.textContent = horaFormateada;

        contenedor.appendChild(horadDiv);
    }

};

/**Bloque horas del viernes */
generarBloqueHoras('columna-horas-viernes-dia',20,23);
/**bloque horas del sabado */
generarBloqueHoras('columna-horas-sabado-dia',0,23);
/**bloque horas del domingo */
generarBloqueHoras('columna-horas-domingo-dia',0,20);

const pintarEventosEnTablon = () =>{
    let eventosGuardados = localStorage.getItem("eventos");
  let listaEventos;
  if (eventosGuardados === null) {
    listaEventos = [];
  } else {
    listaEventos = JSON.parse(eventosGuardados);
  };

  for (const evento of listaEventos) {
    
    // DEBUG: Ver qué contiene cada evento
    console.log("Evento:", evento);

    //  creamos la  tarjeta
    const tarjetaEvento = document.createElement('div');
    tarjetaEvento.classList.add('evento-card'); // Agregar clase base
    
    // detecta si es clase o actividad por als propiedades
    // Clase tiene 'nivel', Actividad tiene 'actividadTipo'
    const esClase = evento.nivel;
    const esActividad = evento.actividadTipo;
    
    if (esClase) {
        
        tarjetaEvento.classList.add('evento-card--clase');
        tarjetaEvento.innerHTML = `
            <strong>${evento.estilo}</strong>
            <span>${evento.nivel}</span>
            <span>${evento.horaInicio} - ${evento.horaFin}</span>
        `;
    } else if (esActividad) {
        
        tarjetaEvento.classList.add('evento-card--actividad');
        tarjetaEvento.innerHTML = `
            <strong>${evento.actividadTipo}</strong>
            <span>${evento.estilo}</span>
            <span>${evento.horaInicio} - ${evento.horaFin}</span>
        `;
    }

if (evento.duracionHoras === 1) {
        tarjetaEvento.classList.add('evento-card--small');
    }

    //  calcular la posición y el tamaño
 // hora de inicio  de cada tabla 
const horaInicioVisualDia = {
    viernes: 20, 
    sabado: 0,   
    domingo: 0   
};

//obtenemos la hora de inicio del evento
const horaInicioNum = parseInt(evento.horaInicio.split(':')[0]);
// calculamos la posición
const posicionTop = (horaInicioNum - horaInicioVisualDia[evento.dia]) * 64;
// calculamos la altura
const altura = evento.duracionHoras * 64;
tarjetaEvento.style.height = `${altura}px`;
if (posicionTop >= 0) {
    tarjetaEvento.style.top = `${posicionTop}px`;
}

    //esto es para que el nombre de la ubicacion coincida con el nombre del id que tengo en el html
    const ubicaciones = {
        'Sala Be Hopper': 'sala-be-hopper',
        'Sala New Orleans': 'sala-new-orleans',
        'Sala Savoy': 'sala-savoy',
        'Antiguo Casino': 'casino',
        'Parque de Gasset': 'gasset',
        'Prado': 'prado'
    };
    const idUbicacion = ubicaciones[evento.ubicacion];
    if (!idUbicacion) {
        return; // me salgo para que no de error
    }

    const idContenedor = `${idUbicacion}-${evento.dia}`; // asi junto el nombre de la ubicacion con el dia ya que en cada cuadrado esta nombreUbicacion + dia

    //añadimos la tarjeta al horario
    const contenedorSala = document.getElementById(idContenedor);
    if (contenedorSala) {
        contenedorSala.appendChild(tarjetaEvento);
    }
}

};

pintarEventosEnTablon();
