import { Evento } from "./Evento.js";

export class Actividad extends Evento{

    constructor({profesores,tipo,banda,...restoDePropiedades}){
        super(restoDePropiedades);
        this.profesores = profesores;
        this.tipo = tipo;
        this.banda = banda;
    }
}