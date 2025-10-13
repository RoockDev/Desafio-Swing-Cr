import { getListaDeEventos } from "./eventManager.js";

const listaDeEventos = getListaDeEventos();

const diaSelect = document.getElementById("dia-select");
const horaSelect = document.getElementById("hora-select");

diaSelect.addEventListener("change", () => {
  //obtenemos el dia seleccionada
  const diaSeleccionado = diaSelect.value;

  //Limpiamos el select de la hora antes de seleccionarlo por si el usuario cambia de idea
  horaSelect.innerHTML =
    '<option value="">--Por favor, elige una hora--</option>';
  if (!diaSeleccionado) {
    return; //por si el usuario cambia de idea y deselecciona el dia no hacemos nada
  }

  const eventosDelDia = listaDeEventos.filter(
    (evento) => evento.dia.toLowerCase() === diaSeleccionado
  );

  /**
   * utilizamos flatMap en vez de map por que algunas actividades, en vez de tener una hora fija
   * tiene un array de distintas horas como por ejemplo las clases del sabado y del domingo
   * y con flatmap podemos aplanar el array para asi poder mostrar todsas las horas para poder
   * elegir en el formulario
   */
  const todasLasHoras = eventosDelDia.flatMap((evento) => evento.hora);
  /**
   * Aqui utilizamos set porque no queremos horas duplicadas y set devuelve un array sin duplicados
   */
  const horasUnicas = [...new Set(todasLasHoras)];
  horasUnicas.forEach((hora) => {
    const option = document.createElement("option");
    option.value = hora;
    option.textContent = hora;
    horaSelect.appendChild(option);
  });

  horaSelect.addEventListener("change", () => {
    const actividades = document.getElementById("resultados-actividades");
    actividades.innerHTML = "";

    const dia = diaSelect.value;
    const hora = horaSelect.value;
    if (!hora) return; // Si no hay hora, no hacemos nada

    //Filtramos los eventos que coinciden con el dia y la hora
    const eventosDiaYhora = listaDeEventos.filter(
      (evento) =>
        evento.dia.toLowerCase() === dia && String(evento.hora).includes(hora)
      /**
       * String(evento.hora).includes(hora), es por que evento.hora a veces es un string
       * pero otras veces es un array si el evento tiene varias horas como metimos en array anteriormente
       * esto convierte tanto el string como el array a texto y comprueba si la hora seleccionada esta ahi
       * incluida
       */
    );

    actividades.innerHTML = '<h3>Actividades Disponibles: </h3>';
    eventosDiaYhora.forEach((evento) => {
      const label = document.createElement('label');
      label.className = 'resultado-act'; //para darle estilo luego

      //creamos radio button para poder clicar la actividad que el usuario quiere
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'actividad-seleccionada';
      radio.value = evento.id;

      const span = document.createElement('span');
      span.textContent = `${evento.nombre} en ${evento.ubicacion}`;

      label.appendChild(radio);
      label.appendChild(span);
      actividades.appendChild(label);

    });
  });
});
