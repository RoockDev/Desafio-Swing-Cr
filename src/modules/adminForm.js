const tipoEvento = () =>{
    
const evento = document.getElementById('tipo-evento');
const clase = document.getElementById('campos-clase');
const actividad = document.getElementById('campos-actividad');

evento.addEventListener('change',() =>{
    clase.style.display = 'none';
    clase.style.display = 'none'
if (evento.value === 'clase') {
    clase.style.display = 'block';
}else if (evento.value === 'actividad') {
    actividad.style.display = 'block';
}
});

}

tipoEvento();


