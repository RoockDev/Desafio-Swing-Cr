import { actividades } from './actividadesModales.js';

/**lógica para mostrar y añadir las tarjetas de las activiades en la página principal */
export function renderActividades() {
  const contenedor = document.querySelector('.actividades__contenedor');
  if (!contenedor) return;
  contenedor.innerHTML = '';
  actividades.forEach((actividad, id) => {
    const div = document.createElement('div');
    div.classList.add('actividad-card');
    div.dataset.id = id;
    div.innerHTML = `
      <h4>${actividad.nombre}</h4>
      <p>Fecha: ${actividad.dia}</p>
      <p>Hora: ${actividad.hora}</p>
      <p>Ubicación: ${actividad.ubicacion}</p>
    `;
    contenedor.appendChild(div);
  });
}