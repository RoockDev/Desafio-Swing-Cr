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

//  select de horas segun dia seleccionado asi nos ceñimos al horario
const poblarSelectHoras = () => {
  const selectDia = document.getElementById("evento-dia");
  const selectUbicacion = document.getElementById("evento-ubicacion");
  const selectHora = document.getElementById("evento-hora");

  const actualizarHorasDisponibles = () => {
    const dia = selectDia.value;
    const ubicacion = selectUbicacion.value;
    
    // Limpiar opciones
    selectHora.innerHTML = '<option value="">-- Selecciona una hora --</option>';
    
    if (!dia) return;

    // Rangos de horas por día
    const rangosPorDia = {
      viernes: { min: 20, max: 23 },
      sabado: { min: 0, max: 23 },
      domingo: { min: 0, max: 20 }
    };

    const rango = rangosPorDia[dia];
    if (!rango) return;

    // Obtener eventos guardados
    const eventosGuardados = JSON.parse(localStorage.getItem("eventos")) || []; //si no hay se crea una vacia

    // Generar opciones de horas
    for (let hora = rango.min; hora <= rango.max; hora++) {
      const horaFormateada = `${String(hora).padStart(2, '0')}:00`;
      
      // Verificar si está ocupada 
      let ocupada = false;
      if (ubicacion) {
        ocupada = eventosGuardados.some(ev => 
          ev.dia === dia && 
          ev.ubicacion === ubicacion && 
          ev.horaInicio === horaFormateada
        );
      }

      const option = document.createElement('option');
      option.value = horaFormateada;
      option.textContent = horaFormateada + (ocupada ? ' (ocupada)' : '');
      option.disabled = ocupada;
      selectHora.appendChild(option);
    }
  };

  selectDia.addEventListener('change', actualizarHorasDisponibles);
  selectUbicacion.addEventListener('change', actualizarHorasDisponibles);
};

poblarSelectHoras();

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
  const tipo = document.getElementById("tipo-evento").value;
  const estilo = document.getElementById("clase-estilo").value;
  const ubicacion = document.getElementById("evento-ubicacion").value;
  const profesores = document.querySelector(
    'input[name="tiene-profesores"]:checked'
  ).value;
  const mensajeFormulario = document.getElementById("form-message");

  // Validar que la hora esté en punto 
  const minutosHora = parseInt(horaInicio.split(':')[1]);
  if (minutosHora !== 0) {
    mensajeFormulario.classList.add("form-message--error");
    mensajeFormulario.textContent = "La hora de inicio debe ser en punto.";
    return;
  }

  // Calcular horaFin automáticamente (+1 hora)
  const horaInicioNum = parseInt(horaInicio.split(':')[0], 10);
  const horaFinNum = (horaInicioNum + 1) % 24;
  const horaFinStr = `${String(horaFinNum).padStart(2, '0')}:00`;

  // si ya existe
  const conflicto = listaEventos.find(evento => 
    evento.dia === dia && 
    evento.ubicacion === ubicacion && 
    evento.horaInicio === horaInicio
  );

  if (conflicto) {
    mensajeFormulario.classList.add("form-message--error");
    mensajeFormulario.textContent = "Ya existe un evento en ese horario y ubicación.";
    return;
  }

  const datosEvento = {
    dia: dia,
    horaInicio: horaInicio,
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
  } else {
    const nivel = document.getElementById("clase-nivel").value;
    datosEvento.nivel = nivel;
    nuevoEvento = new Clase(datosEvento);
  }

  mensajeFormulario.classList.add("form-message--success");
  mensajeFormulario.textContent = "Evento registrado correctamente";

  listaEventos.push(nuevoEvento);
  localStorage.setItem("eventos", JSON.stringify(listaEventos));
};

adminForm.addEventListener("submit", handleFormSubmit);
