export class Evento{
    constructor({id,nombre,dia,horaInicio,horaFin,duracionHoras,ubicacion,estilo,descripcion}){
        this.id = id;
        this.dia = dia;
        this.horaInicio = horaInicio;
        this.horaFin = horaFin;
        this.duracionHoras =duracionHoras
        this.ubicacion = ubicacion;
        this.estilo = estilo;
    }
}