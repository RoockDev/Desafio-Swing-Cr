export class Evento{
    constructor({id,nombre,dia,horaInicio,ubicacion,estilo,descripcion}){
        this.id = id;
        this.dia = dia;
        this.horaInicio = horaInicio;
        // Calcular automáticamente horaFin (siempre +1 hora)
        const hora = parseInt(horaInicio.split(':')[0], 10);
        this.horaFin = `${String((hora + 1) % 24).padStart(2, '0')}:00`;
        this.ubicacion = ubicacion;
        this.estilo = estilo;
    }
}