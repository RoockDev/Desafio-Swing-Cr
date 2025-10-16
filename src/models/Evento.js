export class Evento{
    constructor({id,nombre,dia,horaInicio,horaFin,ubicacion,estilo,descripcion}){
        this.id = id;
        this.dia = dia;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.ubicacion = ubicacion;
        this.estilo = estilo;
    }
}