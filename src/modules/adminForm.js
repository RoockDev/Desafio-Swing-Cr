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
  const horaFin = document.getElementById("evento-fin").value;
  const tipo = document.getElementById("tipo-evento").value;
  const estilo = document.getElementById("clase-estilo").value;
  const ubicacion = document.getElementById("evento-ubicacion").value;
  const profesores = document.querySelector(
    'input[name="tiene-profesores"]:checked'
  ).value;
  const mensajeFormulario = document.getElementById("form-message");

  /**
   * queremos comprobar que solo se registran eventos entre las 20:00 del viernes(1200 minutos) y las 20:00
   * del domingo(1200 minutos) ya que es el horario ofical del festival
   * lo he transformado a minutos por que si lo comparo con horas exactas, para el viernes no habria problema
   * hacer la validacion, pero para el cierre el domingo si, no podria poner que la hora fin sea justa a las 20:00
   * tendria que hacerlo a las 19:59 lo cual queda  feo y es poco intuitivo para el usuario, por eso lo hago con minutos
   */

  const [hInicio, mInicio] = horaInicio.split(":");
  const totalMinutosInicio = parseInt(hInicio) * 60 + parseInt(mInicio);

  const [hFin, mFin] = horaFin.split(":");
  const totalMinutosFin = parseInt(hFin) * 60 + parseInt(mFin);

  const HORA_LIMITE_FESTIVAL = 1200;
  if (
    (dia === "viernes" && totalMinutosInicio < HORA_LIMITE_FESTIVAL) ||
    (dia === "domingo" && totalMinutosFin > HORA_LIMITE_FESTIVAL)
  ) {
    mensajeFormulario.classList.add("form-message--error");
    mensajeFormulario.textContent =
      "Error: El horario del festival es del viernes a las 20:00 hasta el domingo a las 20:00";
    return;
  }

  //queremos que los minutos de las clases para la hora inicio y fin puedan ser incrementos de 5
  const minutosInicio = parseInt(horaInicio.split(":")[1]);
  const minutosFin = parseInt(horaFin.split(":")[1]);

  if (minutosInicio % 5 !== 0 || minutosFin % 5 !== 0) {
    mensajeFormulario.classList.add("form-message--error");
    mensajeFormulario.textContent =
      "Las horas deben ser en incrementos de 5 minutos (ej: 10:05, 10:10) ";
    return;
  } else {
    limpiarMensajes();
  }

  if (horaFin <= horaInicio) {
    mensajeFormulario.classList.add("form-message--error");
    mensajeFormulario.textContent =
      "Horario incorrecto para registrar, la hora fin debe ser posterior al inicio";
    return;
  } else {
    limpiarMensajes();
  }

  //ahora validamos por que queremos que los eventos tengan una duracion minima de 30 min
  //necesitamos obtener los minutos totales

  //totalMinutosInicio y totalMinutosFin los declaramos arriba encima de la comprobacion de horario de viernes a domingo

  const duracion = totalMinutosFin - totalMinutosInicio;
  if (duracion < 30) {
    mensajeFormulario.classList.add("form-message--error");
    mensajeFormulario.textContent = "La duracion minima debe ser de 30 minutos";

    return;
  } else {
    limpiarMensajes();
  }

  //recorremos los eventos para comprobar que no se solapen dia horas y ubicacion
  for (const eventoGuardado of listaEventos) {
    if (
      eventoGuardado.dia === dia &&
      eventoGuardado.ubicacion === ubicacion &&
      horaInicio < eventoGuardado.horaFin &&
      horaFin > eventoGuardado.horaInicio
    ) {
      mensajeFormulario.classList.add("form-message--error");
      mensajeFormulario.textContent =
        "Esa ubicacion no esta disponible en ese dia y tramo horario";
      return;
    }
  }

  const datosEvento = {
    dia: dia,
    horaInicio: horaInicio,
    horaFin: horaFin,
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
