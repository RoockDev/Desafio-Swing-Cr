const tipoEvento = () =>{
    
const evento = document.getElementById('tipo-evento');
const clase = document.getElementById('campos-clase');
const actividad = document.getElementById('campos-actividad');

evento.addEventListener('change',() =>{
    clase.style.display = 'none';
    clase.style.display = 'none'
if (evento.value === 'clase') {
    actividad.style.display = 'none';
    clase.style.display = 'block';
    
}else if (evento.value === 'actividad') {
    clase.style.display = 'none';
    actividad.style.display = 'block';
    
}
});

}

tipoEvento();

const limpiarMensajes = () => {
    const mensajeFormulario = document.getElementById('form-message');
    mensajeFormulario.classList.remove('form-message--error','form-message-success');

    mensajeFormulario.textContent = '';
};

const adminForm = document.querySelector('.admin-form');

const handleFormSubmit = (e) => {
    //evitamos que la pagina se recargue
    e.preventDefault();
    limpiarMensajes();

    let eventosGuardados = localStorage.getItem('eventos');
    let listaEventos;
    if (eventosGuardados === null) {
        listaEventos = [];
    }else{
        listaEventos = JSON.parse(eventosGuardados);
    };

    
     const dia = document.getElementById('evento-dia').value;
     const horaInicio = document.getElementById('evento-hora').value;
     const horaFin = document.getElementById('evento-fin').value;
     const tipo = document.getElementById('tipo-evento').value;
     const estilo = document.getElementById('clase-estilo').value;
     const ubicacion = document.getElementById('evento-ubicacion').value;
     const tieneProfesores = document.querySelector('input[name="tiene-profesores"]:checked').value;
    const mensajeFormulario = document.getElementById('form-message'); 

    //queremos que los minutos de las clases para la hora inicio y fin puedan ser incrementos de 5
    const minutosInicio = parseInt(horaInicio.split(':')[1]);
    const minutosFin = parseInt(horaFin.split(':')[1]);

    if (minutosInicio % 5 !== 0 || minutosFin % 5 !== 0) {
        mensajeFormulario.classList.add('form-message--error');
        mensajeFormulario.textContent = 'Las horas deben ser en incrementos de 5 minutos (ej: 10:05, 10:10) ';
        return;
    }else{
        limpiarMensajes();
    };

    //ahora validamos por que queremos que los eventos tengan una duracion minima de 30 min
    //necesitamos obtener los minutos totales
    const [hInicio,mInicio] = horaInicio.split(':');
    const totalMinutosInicio = parseInt(hInicio) * 60 + parseInt(mInicio);

    const [hFin,mFin] = horaFin.split(':');
    const totalMinutosFin = parseInt(hFin) * 60 + parseInt(mFin);

    const duracion = totalMinutosFin - totalMinutosInicio;
    if (duracion <30 ) {
        mensajeFormulario.classList.add('form-message--error');
        mensajeFormulario.textContent = 'La duracion minima debe ser de 30 minutos';
        
        return;
    }else{
        limpiarMensajes();
    };
    


     if (horaFin <= horaInicio) {
        mensajeFormulario.classList.add('form-message--error');
        mensajeFormulario.textContent = 'Horario incorrecto para registrar, la hora fin debe ser posterior al inicio';
        return;
     }else{
        limpiarMensajes();
        
     };

     const datosEvento = {
        dia: dia,
        horaInicio: horaInicio,
        horaFin: horaFin,
        tipo: tipo,
        tieneProfesores: tieneProfesores,
        estilo: estilo,
        ubicacion:ubicacion
     };

     if (datosEvento.tipo === 'actividad') {
        const actividadTipo = document.getElementById('actividad-tipo').value;
        const actividadDescripcion = document.getElementById('actividad-descripcion').value;
        const tieneBanda = document.querySelector('input[name="tiene-banda"]:checked').value;
        datosEvento.actividadTipo = actividadTipo;
        datosEvento.actividadDescripcion = actividadDescripcion;
        datosEvento.tieneBanda = tieneBanda;
        
     }else{
        const nivel = document.getElementById('clase-nivel').value;
        datosEvento.nivel = nivel;
     };

     listaEventos.push(datosEvento);
     localStorage.setItem('eventos',JSON.stringify(listaEventos));
}

adminForm.addEventListener('submit',handleFormSubmit);




