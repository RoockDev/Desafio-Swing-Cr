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

let scrollAutomaticoParaArrastrar = null;
//Drag and Drop

let tarjetaArrastrada = null; // Aquí guardo que tarjeta estoy arrastrando
let celdaOrigen = null; // Aquí guardo de qué celda sale la tarjeta
let indiceSalaOrigen = null; // Aquí guardo de que columna/sala sale para que no pueda arrastrarse de lado y cambiar de sala

// Esta función es para que el evento para poder arrastrar una tarjeta
const configurarDragAndDrop = (tarjeta) => {
  tarjeta.addEventListener('dragstart', (e) => {
    //Esta la he copiado entera ,  no tenia ni idea de como se hacia pero es que no podia arrastrar en muchos
    //sitios si no iba el scroll, ya esta aprendido para futuro y la verdad esque mola mucho
    //activamos el scroll para poder bajar ya que la pantalla es grande, osea que hay muchas filas eso
    scrollAutomaticoParaArrastrar = setInterval(() => {
        const mouseY = e.clientY;
        const windowHeight = window.innerHeight;
        const scrollStep = 20; // píxeles a mover cada vez

        // Si el ratón está cerca del borde inferior, baja el scroll
        if (mouseY > windowHeight - 80) { //80 pixeles
            window.scrollBy(0, scrollStep);
        }
        // Si el ratón está cerca del borde superior, sube el scroll
        if (mouseY < 80) {
            window.scrollBy(0, -scrollStep);
        }
    }, 50); // cada 50ms

    // Guardo la tarjeta que estoy arrastrando para saber que es la arrastrada y no liarme
    tarjetaArrastrada = tarjeta;
    // Guardo la celda de donde sale 
    celdaOrigen = tarjeta.parentElement;
    // Guardo el número de columna 0-5 para validar despues que no cambie de sala
    indiceSalaOrigen = celdaOrigen._indiceSala; //sin el _ no funciona ya que no indica que se creo indice sala
    tarjeta.style.opacity = '0.5';
  });

  
  tarjeta.addEventListener('dragend', () => {
  
    tarjeta.style.opacity = '1';
    tarjetaArrastrada = null;
    celdaOrigen = null;
    indiceSalaOrigen = null;
    //para parar el scroll
      clearInterval(scrollAutomaticoParaArrastrar);
    scrollAutomaticoParaArrastrar = null;
  });
};

// Esta función pone todas las celdas para que puedan recibir tarjetas
const configurarDropEnCeldas = () => {
  const todasLasCeldas = document.querySelectorAll('.celda-sala');
  
  
  for (let i = 0; i < todasLasCeldas.length; i++) {
    const celda = todasLasCeldas[i];
    
    
    // Es necesario hacer preventDefault para que el navegador permita soltar aqui si no no va
    celda.addEventListener('dragover', (e) => {
      e.preventDefault(); 
      
      // Si no estoy arrastrando nada me voy
      if (!tarjetaArrastrada) return;
      
      // compruebo si puedo soltar aqui o no
      const esMismaSala = celda._indiceSala === indiceSalaOrigen; // Se mira si es la misma columna
      const estaOcupada = celda.children.length > 0; // Children ve si tiene algo dentro y si es mayor que 0 esque hay tarjeta
      
      // Segun si se puede o no la celda se pone de un color
      if (!esMismaSala) {
        // no es la misma sala o columa por lo tanto no se puede mover de lado y se pone en rojo
        celda.classList.add('celda-hover-prohibido');
      } else if (estaOcupada) {
        // si es la misma sala pero hay tarjeta se pone el fondo rojo aunque no se vea el borde si se ve
        celda.classList.add('celda-hover-invalido');
      } else {
        // si es la misma columna sala y esta vacia se pone en verde 
        celda.classList.add('celda-hover-valido');
      }
    });

   
    // cuaando dejo de estar por encima borro todos los estilos para que haga efecto de que ya no estoy
    celda.addEventListener('dragleave', () => {
      celda.classList.remove('celda-hover-valido', 'celda-hover-invalido', 'celda-hover-prohibido');
    });

    // Soltamos
    celda.addEventListener('drop', (e) => {
      e.preventDefault(); // Evito el comportamiento por defecto del navegador
      // Quito las clases de color por que no tiene sentido tenerlas
      celda.classList.remove('celda-hover-valido', 'celda-hover-invalido', 'celda-hover-prohibido');

      // Si no hay tarjeta arrastrandose, me voy
      if (!tarjetaArrastrada) return;

      // Compruebo que sea la misma sala o columna
      if (celda._indiceSala !== indiceSalaOrigen) {
        console.log('No se puede cambiar de sala'); //para pruebas
        return; // y me voy
      }

      //Compruebo que la celda esté vacía
      if (celda.children.length > 0) {
        console.log('Celda ocupada, no se puede soltar'); //para pruebas
        return; // y me voy
      }

      // Si estoy aqui es que se puede soltar y para bien

      // Obtengo los datos de la celda donde estoy soltando (día, hora, sala) para tema de localStorea etc
      const nuevoDia = celda._dia;
      const nuevaHora = celda._hora;
      const nuevaSala = celda._sala;
      
      // Obtengo el evento original que está guardado en la tarjeta
      const eventoOriginal = tarjetaArrastrada._eventoOriginal;

      // Actualizo el evento en localStorage 
      const eventosGuardados = JSON.parse(localStorage.getItem("eventos")) || []; //si no crea una array vacío
      // Busco el evento que estoy moviendo dentro del array de eventos guardados
      const indice = eventosGuardados.findIndex(evento =>
        evento.dia === eventoOriginal.dia &&
        evento.horaInicio === eventoOriginal.horaInicio &&
        evento.ubicacion === eventoOriginal.ubicacion
      );

      // -1 es que no se encontro y 1 que si
      if (indice !== -1) {
        // Actualizamos los datos del evento con los nuevos
        eventosGuardados[indice].dia = nuevoDia;
        eventosGuardados[indice].horaInicio = nuevaHora;
        eventosGuardados[indice].ubicacion = nuevaSala;
        
        //para que salgan bien las horas
        const hora = parseInt(nuevaHora.split(':')[0], 10);
        const nuevaHoraFin = `${String((hora + 1) % 24).padStart(2, '0')}:00`; 
        eventosGuardados[indice].horaFin = nuevaHoraFin;

        // Guardo el array actualizado en localStorage
        localStorage.setItem("eventos", JSON.stringify(eventosGuardados));
        
        
        tarjetaArrastrada._eventoOriginal = eventosGuardados[indice];
        
        // Se Actualizo el HTML de la tarjeta para que muestre las nuevas horas
        const eventoActualizado = eventosGuardados[indice];
        if (eventoActualizado.nivel) {
          // Es una clase
          tarjetaArrastrada.innerHTML = `
            <strong>${eventoActualizado.estilo}</strong>
            <span>${eventoActualizado.nivel}</span>
            <span>${nuevaHora}-${nuevaHoraFin}</span>
          `;
        } else if (eventoActualizado.actividadTipo) {
          // Es una actividad 
          tarjetaArrastrada.innerHTML = `
            <strong>${eventoActualizado.actividadTipo}</strong>
            <span>${eventoActualizado.estilo}</span>
            <span>${nuevaHora}-${nuevaHoraFin}</span>
          `;
        }
        
        //cuando cambiaba de tarjeta los modales no funcionaban y me estaba volviendo loco
        //no hacia mas que dar fallos y gracias a esto de abajo ya bno
        // por lo visto al cambiar innerHTML, se pierden todos los event listeners 
        // el click para abrir el modal y el drag para poder arrastrarla
        
        // He visto  que cloneNode() se usa para crear una copia exacta de la tarjeta
        // cloneNode a true copia todo el HTML que hay dentro, pero no copia los event listeners
        // Y así elimino los listeners viejos que ya no sirven
        
        //si no se ahce todo esto de aqui abajo se cambia la tarjeta si
        //pero no funciona los modales ni nada ya que los listenner no funcionan

        //Menudo pisto todo esto

        const tarjetaNueva = tarjetaArrastrada.cloneNode(true);
        
        // replaceChild sustituye el hueco viejo pro el nuevo
        
        tarjetaArrastrada.parentNode.replaceChild(tarjetaNueva, tarjetaArrastrada);
        tarjetaArrastrada = tarjetaNueva;
        
        // Y ahora hay que añadir de nuevo todos los listenners porque se fueron
        
      
        tarjetaArrastrada._eventoOriginal = eventoActualizado;
        
        tarjetaArrastrada.addEventListener('click', (e) => {
          abrirModal(eventoActualizado); 
        });
        
        
        configurarDragAndDrop(tarjetaArrastrada);
      }

      
     
      // Si la tarjeta ya estaba en otra celda, se mueve automáticamente 
      //hasta que he conseguido entenderlo
      if (!tarjetaArrastrada.parentNode || tarjetaArrastrada.parentNode !== celda) {
        celda.appendChild(tarjetaArrastrada);
      }
    });
  }
};


configurarDropEnCeldas();




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

