// Aquí defino las horas de inicio y fin de cada día del festival
// El viernes empieza a las 20:00 y termina a las 23:00
// El sábado va de 00:00 a 23:00 (todo el día)
// El domingo va de 00:00 a 20:00
const horasDeDias = {
  viernes: { min: 20, max: 23 },
  sabado: { min: 0, max: 23 },
  domingo: { min: 0, max: 20 }
};

// Array con los nombres de todas las salas del festival
// Esto lo uso para crear las columnas de la tabla
const salas = [
  'Sala Be Hopper',
  'Sala New Orleans',
  'Sala Savoy',
  'Antiguo Casino',
  'Parque de Gasset',
  'Prado'
];

// Esta función crea todas las filas de la tabla de cada día
// Por ejemplo si le paso viernes crea las filas de 20:00 a 23:00 ya que son sus horas
const generarFilasTabla = (dia) => {
  // Busco el tbody del día 
  const tbody = document.getElementById(`tbody-${dia}`);
  // Si no existe me voy
  if (!tbody) return;

  // Cojo las horas de inicio y fin de ese día
  const horasDia = horasDeDias[dia]; 
  // Vacío el tbody por si tenía algo antes
  tbody.innerHTML = '';

  // Recorro todas las horas del día desde min hasta max
  for (let hora = horasDia.min; hora <= horasDia.max; hora++) {
    // Creo una nueva fila (tr) cada día tendra cantidad distinta 
    const tr = document.createElement('tr');
    
    // Formateo la hora para que salga chula (08:00 en vez de 8:00)
    const horaFormateada = `${String(hora).padStart(2, '0')}:00`;

    // Creo la primera celda de la fila (la que muestra la hora)
    const tdHora = document.createElement('td');
    tdHora.classList.add('celda-hora'); // Le pongo la clase para los estilos
    tdHora.textContent = horaFormateada; // Escribo la hora dentro
    tr.appendChild(tdHora); // La añado a la fila

    // Ahora creo una celda para cada sala (6 celdas, una por sala)
    salas.forEach((sala, indiceSala) => {
      const td = document.createElement('td');
      td.classList.add('celda-sala'); // Clase para estilos
      
      
      
      td._dia = dia; // En qué día está esta celda (viernes, sábado...)
      td._hora = horaFormateada; // (20:00, 21:00...)
      td._sala = sala; //  (Sala Be Hopper  etc...)
      td._indiceSala = indiceSala; // El número de columna (0, 1, 2...) para saber si es la misma sala
      
      tr.appendChild(td); // Añado la celda a la fila
    });

    // Añado la fila completa al tbody
    tbody.appendChild(tr);
  }
};

//generamos las tablas de los 3 días
generarFilasTabla('viernes');
generarFilasTabla('sabado');
generarFilasTabla('domingo');



// Esto para cuando se recarga la pagina saber que celdas pintar y que aparezcan
const encontrarCelda = (dia, hora, sala) => {
  const todasLasCeldas = document.querySelectorAll('.celda-sala');
  for (let celda of todasLasCeldas) {
    // Compruebo si los datos coinciden día hora y sala
    if (celda._dia === dia && celda._hora === hora && celda._sala === sala) {
      return celda; // la devuelvo
    }
  }
  return null; // No se encuentra ninguna que coincida
};



// Se pintan en el tablon
const pintarEventosEnTablon = () => {
  const eventosGuardados = localStorage.getItem("eventos");
  const listaEventos = eventosGuardados ? JSON.parse(eventosGuardados) : [];
  listaEventos.forEach(evento => {
    const celda = encontrarCelda(evento.dia, evento.horaInicio, evento.ubicacion);
    
    // Si no encuentro la celda me voy
    if (!celda) return;

    
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('evento'); 
    tarjeta.draggable = true; 
    
    // Guardo una referencia al evento original dentro de la tarjeta
    // Con esto puedo acceder a todos los datos de sde la tarjeta
    tarjeta._eventoOriginal = evento;

    // Dependiendo del tipo de evento, pinto la tarjeta de un color u otro
    if (evento.nivel) {
      // Es una clase
      tarjeta.classList.add('evento--clase'); 
      tarjeta.innerHTML = `
        <strong>${evento.estilo}</strong>
        <span>${evento.nivel}</span>
        <span>${evento.horaInicio}-${evento.horaFin}</span>
      `;
    } else if (evento.actividadTipo) {
      // Es una actividad 
      tarjeta.classList.add('evento--actividad'); 
      tarjeta.innerHTML = `
        <strong>${evento.actividadTipo}</strong>
        <span>${evento.estilo}</span>
        <span>${evento.horaInicio}-${evento.horaFin}</span>
      `;
    }
    celda.appendChild(tarjeta);
    
   
    tarjeta.addEventListener('click', () => {
      abrirModal(evento); 
    });
    
    configurarDragAndDrop(tarjeta);
  });
};



// Modal
const modal = document.getElementById('evento-modal');
const botonCerrar = document.getElementById('modal-close-btn');

// 
const abrirModal = (evento) => {
    // Si el modal no existe en el HTML me voy
    if (!modal) return;
    
    const titulo = document.getElementById('modal-titulo');
    const horario = document.getElementById('modal-horario');
    const ubicacion = document.getElementById('modal-ubicacion');
    const detallesExtra = document.getElementById('modal-detalles-extra');
    
    
    if (titulo) {
        titulo.textContent = evento.estilo || '';
    }
    if (horario) {
        horario.textContent = `${evento.horaInicio} - ${evento.horaFin}`;
    }
    if (ubicacion) {
        ubicacion.textContent = evento.ubicacion || '';
    }
    
    
    if (detallesExtra) {
        if (evento.nivel) {
            // Es una clase
            detallesExtra.innerHTML = `
                <p><strong>Tipo:</strong> Clase</p>
                <p><strong>Nivel:</strong> ${evento.nivel}</p>
                <p><strong>Profesores:</strong> ${evento.profesores}</p>
            `;
        } else if (evento.actividadTipo) {
            // Es una actividad 
            let tieneBanda;
            if (evento.banda === 'si') {
                tieneBanda = 'Sí';
            } else {
                tieneBanda = 'No';
            }
            
            detallesExtra.innerHTML = `
                <p><strong>Tipo:</strong> Actividad</p>
                <p><strong>Actividad:</strong> ${evento.actividadTipo}</p>
                <p><strong>Descripción:</strong> ${evento.descripcion || 'No disponible'}</p>
                <p><strong>Banda en vivo:</strong> ${tieneBanda}</p>
            `;
        }
    }
    
    
    modal.classList.add('modal--visible');
};


const cerrarModal = () => {
    if (modal) {
        modal.classList.remove('modal--visible');
    }
};

if (botonCerrar) {
    botonCerrar.addEventListener('click', cerrarModal);
}

// se cerrar el modal haciendo click fuera del propio modal

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}


pintarEventosEnTablon();

