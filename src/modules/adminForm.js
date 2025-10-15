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

const adminForm = document.querySelector('.admin-form');

const handleFormSubmit = (e) => {
    //evitamos que la pagina se recargue
    e.preventDefault();
    let eventosGuardados = localStorage.getItem('eventos');
    let listaEventos;
    if (eventosGuardados === null) {
        listaEventos = [];
    }else{
        listaEventos = JSON.parse(eventosGuardados);
    };

     const dia = document.getElementById('evento-dia').value;
     const hora = document.getElementById('evento-hora').value;
     const tipo = document.getElementById('tipo-evento').value;
     const estilo = document.getElementById('clase-estilo').value;
     const ubicacion = document.getElementById('evento-ubicacion').value;
     const tieneProfesores = document.querySelector('input[name="tiene-profesores"]:checked').value;
    

     const datosEvento = {
        dia: dia,
        hora: hora,
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




