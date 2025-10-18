import { Evento } from "../models/Evento.js";
import { Actividad } from "../models/Actividad.js";
import { Clase } from "../models/Clase.js";

const tipoEvento = () => {
  const evento = document.getElementById("tipo-evento");
  const clase = document.getElementById("campos-clase");
  const actividad = document.getElementById("campos-actividad");

  evento.addEventListener("change", () => {
    clase.style.display = "none";
    clase.style.display = "none";
    if (evento.value === "clase") {
      actividad.style.display = "none";
      clase.style.display = "block";
    } else if (evento.value === "actividad") {
      clase.style.display = "none";
      actividad.style.display = "block";
    }
  });
};

tipoEvento();

const limpiarMensajes = () => {
  const mensajeFormulario = document.getElementById("form-message");
  mensajeFormulario.classList.remove(
    "form-message--error",
    "form-message--success"
  );

  mensajeFormulario.textContent = "";
};

const adminForm = document.querySelector(".admin-form");

const handleFormSubmit = (e) => {
  //evitamos que la pagina se recargue
  e.preventDefault();
  limpiarMensajes();

  let eventosGuardados = localStorage.getItem("eventos");
  let listaEventos;
  if (eventosGuardados === null) {
    listaEventos = [];
  } else {
    listaEventos = JSON.parse(eventosGuardados);
  }

  const dia = document.getElementById("evento-dia").value;
  const horaInicio = document.getElementById("evento-hora").value;
  const duracionHoras = parseInt(document.getElementById("evento-duracion").value);
  const tipo = document.getElementById("tipo-evento").value;
  const estilo = document.getElementById("clase-estilo").value;
  const ubicacion = document.getElementById("evento-ubicacion").value;
  const profesores = document.querySelector(
    'input[name="tiene-profesores"]:checked'
  ).value;
  const mensajeFormulario = document.getElementById("form-message");

  /**no se puede registrar una actividad que pase al dia siguiente debera registrarla en el dia correspondiente */
  const horaDeInicioNum = parseInt(horaInicio.split(':')[0]);

    if (horaDeInicioNum + duracionHoras > 24) {
        mensajeFormulario.classList.add("form-message--error");
        mensajeFormulario.textContent = "Error: La duración del evento no puede hacer que pase al día siguiente. Deberá registrarla en el dia correspondiente";
        return;
    }

  /**las horas tienen que ser a en punto */
  const minutosHora = parseInt(horaInicio.split(':')[1]);
  if (minutosHora!==0) {
    mensajeFormulario.classList.add("form-message--error");
    mensajeFormulario.textContent = "La hora de inicio debe ser en punto (ej: 10:00, 11:00).";
    return;
  }

  /**calculamos el tiempo en minutos */
  const [hora,minutos] = horaInicio.split(":");
  const totalMinutosInicio = parseInt(hora) * 60 + parseInt(minutos);
  const totalMinutosFin = totalMinutosInicio + (duracionHoras * 60);

  if (dia === 'viernes' && totalMinutosInicio < 20 * 60) {
    mensajeFormulario.classList.add("form-message--error");
    mensajeFormulario.textContent = "Los eventos del viernes no pueden empezar antes de las 20:00.";
    return;
  };

  if (dia === "domingo" && totalMinutosFin > 20 * 60) {
        mensajeFormulario.classList.add("form-message--error");
        mensajeFormulario.textContent = "Los eventos del domingo no pueden terminar despues de las 20:00.";
        return;
  };



  

  //recorremos los eventos para comprobar que no se solapen dia horas y ubicacion
for (const eventoGuardado of listaEventos) {
  if (eventoGuardado.dia === dia && eventoGuardado.ubicacion === ubicacion) {
            const [hGuardado, mGuardado] = eventoGuardado.horaInicio.split(':');
            const inicioGuardado = parseInt(hGuardado) * 60 + parseInt(mGuardado);
            const finGuardado = inicioGuardado + (eventoGuardado.duracionHoras * 60);

            // Los dos eventos se solapan si uno empieza antes de que el otro termine.
            if (totalMinutosInicio < finGuardado && totalMinutosFin > inicioGuardado) {
                mensajeFormulario.classList.add("form-message--error");
                mensajeFormulario.textContent = "la ubicación ya esta ocupada en ese tramo.";
                return;
            }
        }

 
};

//formateamos la hora fin para guardarla
const horaFin = Math.floor(totalMinutosFin/60) % 24;
const minutosFin = totalMinutosFin % 60;
const horaFinStr = `${String(horaFin).padStart(2, '0')}:${String(minutosFin).padStart(2, '0')}`;
//con padstar le indicamos que queremos dos digitos si no hay dos ponemos un 0
//asi si ponemos 8 en vez de 8:00 seria 08:00 por ejemplo

  const datosEvento = {
    dia: dia,
    horaInicio: horaInicio,
    horaFin: horaFinStr,
    duracionHoras: duracionHoras,
    tipo: tipo,
    profesores: profesores,
    estilo: estilo,
    ubicacion: ubicacion,
  };

  let nuevoEvento;
  if (datosEvento.tipo === "actividad") {
    const actividadTipo = document.getElementById("actividad-tipo").value;
    const descripcion = document.getElementById("actividad-descripcion").value;
    const banda = document.querySelector(
      'input[name="tiene-banda"]:checked'
    ).value;
    datosEvento.actividadTipo = actividadTipo;
    datosEvento.descripcion = descripcion;
    datosEvento.banda = banda;
    nuevoEvento = new Actividad(datosEvento);
    console.log("Instancia de actiivdad creada ", nuevoEvento);
  } else {
    const nivel = document.getElementById("clase-nivel").value;
    datosEvento.nivel = nivel;
    nuevoEvento = new Clase(datosEvento);
    console.log("instancia de clase creada", nuevoEvento);
  }

  mensajeFormulario.classList.add("form-message--success");
  mensajeFormulario.textContent = "Evento registrado correctamente";

  listaEventos.push(nuevoEvento);
  localStorage.setItem("eventos", JSON.stringify(listaEventos));
};

adminForm.addEventListener("submit", handleFormSubmit);
