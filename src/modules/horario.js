export const generarBloqueHoras = (idContenedor, horaInicio, horaFin) => {
    
    const contenedor = document.getElementById(idContenedor);
    if (!contenedor) {
        return;         //si por lo que sea no existe el contenedor se va
    };

    //ahora quiero recorrer todas las horas
    for(let hora = horaInicio; hora <= horaFin; hora++){
        const horadDiv = document.createElement('div');

        //para aplicarle estilos
        horadDiv.classList.add('hora-etiqueta');

        /**ahora formateamos por si acaso se mete un hora que por ejemplo sea 8
         * pues queremos que salga 08:00, vamos dos digitos y padstart el primer numero
         * dentro del parentesis indica la cantidad de digitos que se quiere
         * y el 0 con lo que queremos que se rellene si ponemos menos de 2 digitos
         */

        const horaFormateada = `${hora.toString().padStart(2,'0')}:00`;
        horadDiv.textContent = horaFormateada;

        contenedor.appendChild(horadDiv);
    }

};

/**Bloque horas del viernes */
generarBloqueHoras('columna-horas-viernes-dia',20,23);
generarBloqueHoras('columna-horas-viernes-noche',0,6);
/**bloque horas del sabado */
generarBloqueHoras('columna-horas-sabado-dia',9,23);
generarBloqueHoras('columna-horas-sabado-noche',0,6);
/**bloque horas del domingo */
generarBloqueHoras('columna-horas-domingo-dia',9,20);
