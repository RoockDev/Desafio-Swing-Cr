import { Evento } from "./Evento.js";

export class Clase extends Evento{
    constructor({profesores,nivel,...restoDePropiedades}){
        super(restoDePropiedades);
        this.profesores = profesores;
        this.nivel = nivel;
    }

}