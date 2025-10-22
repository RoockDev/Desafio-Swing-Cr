import { actividades } from './actividadesModales.js';

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