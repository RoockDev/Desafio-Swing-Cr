import { Evento } from "./Evento.js";

export class Actividad extends Evento{

    constructor({profesores,actividadTipo,banda,descripcion,...restoDePropiedades}){
        super(restoDePropiedades);
        this.profesores = profesores;
        this.actividadTipo = actividadTipo;
        this.banda = banda;
        this.descripcion = descripcion;
    }
}