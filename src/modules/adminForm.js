import { Evento } from "../models/Evento.js";
import { Actividad } from "../models/Actividad.js";
import { Clase } from "../models/Clase.js";
import { initHeaderMenu } from "./headerMenu.js";

//primero cargamos los estilos del menu hamburguesa
initHeaderMenu();

const tipoEvento = () => {
  const evento = document.getElementById("tipo-evento");
  const clase = document.getElementById("campos-clase");
  const actividad = document.getElementById("campos-actividad");
  const profesSi = document.querySelector(
    'input[name="tiene-profesores"][value="si"]'
  );
  const profesNo = document.querySelector(
    'input[name="tiene-profesores"][value="no"]'
  );

  evento.addEventListener("change", () => {
    clase.style.display = "none";
    actividad.style.display = "none";

    if (evento.value === "clase") {
      clase.style.display = "block";
      profesSi.checked = true;
      profesSi.disabled = true;
    } else if (evento.value === "actividad") {
      actividad.style.display = "block";
      profesNo.checked = true;
    } else {
      profesNo.checked = true;
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
    selectHora.innerHTML =
      '<option value="">-- Selecciona una hora --</option>';

    if (!dia) return;

    // Rangos de horas por día
    const rangosPorDia = {
      viernes: { min: 20, max: 23 },
      sabado: { min: 0, max: 23 },
      domingo: { min: 0, max: 19 },
    };

    const rango = rangosPorDia[dia];
    if (!rango) return;

    // Obtener eventos guardados
    const eventosGuardados = JSON.parse(localStorage.getItem("eventos")) || []; //si no hay se crea una vacia

    // Generar opciones de horas
    for (let hora = rango.min; hora <= rango.max; hora++) {
      const horaFormateada = `${String(hora).padStart(2, "0")}:00`;

      // Verificar si está ocupada
      let ocupada = false;
      if (ubicacion) {
        ocupada = eventosGuardados.some(
          (ev) =>
            ev.dia === dia &&
            ev.ubicacion === ubicacion &&
            ev.horaInicio === horaFormateada
        );
      }

      const option = document.createElement("option");
      option.value = horaFormateada;
      if (ocupada) {
        option.textContent = horaFormateada + " (ocupada)";
      } else {
        option.textContent = horaFormateada;
      }
      option.disabled = ocupada;
      selectHora.appendChild(option);
    }
  };

  selectDia.addEventListener("change", actualizarHorasDisponibles);
  selectUbicacion.addEventListener("change", actualizarHorasDisponibles);
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

  listaEventos.push(nuevoEvento);
  localStorage.setItem("eventos", JSON.stringify(listaEventos));

  mensajeFormulario.classList.add("form-message--success");
  mensajeFormulario.textContent = "Evento registrado correctamente";

  document.querySelector('.admin-form button[type="submit"]').disabled = true;

  setTimeout(() => {
    adminForm.reset(); // Limpia todos los campos del formulario
    location.reload(); // Recarga la página para actualizar el select de horas
  }, 1500); // 1.5 segundos

  // Calcular horaFin automáticamente (+1 hora)
  const horaInicioNum = parseInt(horaInicio.split(":")[0], 10);
  const horaFinNum = (horaInicioNum + 1) % 24;
  const horaFinStr = `${String(horaFinNum).padStart(2, "0")}:00`;
};

adminForm.addEventListener("submit", handleFormSubmit);
