import { actividades } from "./actividadesModales.js";
import { Clase } from "../models/Clase.js";
import { Actividad } from "../models/Actividad.js";

/**
 * la siguiente funcion es para poder distinguir si el evento que vamos a seleccionar
 * pertenece a una clase o a una actividad,
 * cogemos nuestro array de eventos creado en actividadedModales.js
 * y lo mapemos para crear nuevos objetos
 */

export const getListaDeEventos = () =>{
    return actividades.map( dato => {
        if (dato.tipo === 'clase') {
            return new Clase(dato);
        }else {
            return new Actividad(dato);
        }
    });
};