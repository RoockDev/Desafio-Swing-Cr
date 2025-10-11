
# Desafío 1: Planificación Festival Swing CR 

## 🎯 Contexto del Desafío

Este proyecto forma parte del **Desafío 1: Swing CR**  y se enmarca en las asignaturas de **Desarrollo Web en Entorno Cliente** y **Diseño de Interfaces Web**.

El festival de Swing se celebra en Ciudad Real, y mientras actualmente se puede consultar el programa e información del **VII festival de Swing** , el objetivo de esta aplicación es crear una herramienta de planificación para la próxima edición.

## 📝 Objetivo de la Aplicación

Desarrollar una aplicación web que permita el **registro de actividades y clases para Swing CR** y, a partir de dicho registro, **genere el programa/planificación correspondiente** .

## ⚙️ Requisitos Funcionales Clave

La aplicación debe manejar la organización del evento, el cual se lleva a cabo en un fin de semana, **comenzando el viernes a las 20 horas y finalizando el domingo a las 20 horas**.

### 1. Registro de Clases y Actividades

La aplicación debe permitir el registro de dos tipos principales de eventos:

| Evento | Información Requerida |
| :--- | :--- |
| **Clases** | Profesores/as, estilo (Lindy Hop, Shag, Solo Jazz…), y nivel (básico, intermedio, avanzado…). |
| **Actividades** | Tipo (Taster, social, concierto, mix & match), Banda (si toca en directo), Profesores/as implicados/as, Estilo, y Descripción. |

### 2. Reglas de Negocio (Ubicación y Tiempo)

El registro debe validar las siguientes restricciones:

*   **Salas de Clases:** Las clases se llevarán a cabo exclusivamente en tres salas: **Be Hopper, New Orleans y Savoy**. **No podrán coincidir** en horario.
*   **Otras Ubicaciones:** El resto de actividades podrá realizarse en **Antiguo Casino de Ciudad Real, Parque de Gasset, Prado** o en las salas de clase, **siempre que no haya clases en ellas**.
*   **Flujo del Formulario:** Al registrar, **el formulario pedirá en primer lugar el día y la hora**. Luego, mostrará las salas libres o ubicaciones disponibles.

### 3. Interacción con la Tabla del Programa

La aplicación debe incluir una **tabla del programa** con las siguientes funcionalidades:

*   **Visualización Automática:** Cada vez que se registra una clase o actividad, debe **aparecer automáticamente la tarjeta correspondiente** en el día y hora indicada, mostrando el **nombre de la actividad y la ubicación**.
*   **Información Detallada (Modal):** Si se pincha en la tarjeta, **se abrirá un modal con toda la información** correspondiente al evento.
*   **Edición de Horario (Drag and Drop):** El usuario **podrá cambiar haciendo drag and drop la fecha y hora** de una tarjeta. La **ubicación establecida previamente no se podrá cambiar**, pero el sistema debe validar que la ubicación esté disponible en el nuevo horario.

## 💻 Requisitos Técnicos y de Desarrollo

### Desarrollo Web en Entorno Cliente

El desarrollo requiere la aplicación de las siguientes prácticas:

*   **Generación de Proyecto:** Uso de **`Vite`**.
*   **Arquitectura:** **Generación de código utilizando POO** (Programación Orientada a Objetos).
*   **Modularidad:** **Estructuración del proyecto en distintos módulos** e importaciones optimizadas.
*   **JavaScript:** Utilización correcta de **funciones** y **estructuras de almacenamiento en JS**.
*   **Almacenamiento:** Uso de **métodos de almacenamiento en el navegador del cliente**.
*   **Eventos y Formularios:** **Gestión correcta de eventos** e **implementación y validación correcta de formularios**.

### Diseño de Interfaces Web 

La interfaz debe ser atractiva, intuitiva y priorizar la usabilidad, con una temática específica:

*   **Estética:** Diseño de una interfaz atractiva con **temática ** .
*   **Diseño Base:** Requerida la creación de **mockups y wireframes para cada pantalla principal**.
*   **Estilos:** Uso de una **paleta de colores coherente con la temática geek/friki**.
*   **Maquetación:** Maquetación usando **HTML5 y CSS3 con grid/flexbox** .
*   **Responsividad:** Diseño **responsive** que funcione en diferentes dispositivos.
*   **Interacción:** Uso de **animaciones y transiciones** para elementos interactivos.

## 🚀 Metodología de Trabajo (Agile SCRUM)

El proyecto se gestiona siguiendo una **Iniciación a la metodología agile SCRUM**.

*   **Planificación:** **Planificación de tareas por unidades funcionales completas** (coherencia).
*   **Ejecución:** Desarrollo organizado en **Sprints** .
*   **Seguimiento:** El proyecto está **sincronizado con este repositorio en Github** para su seguimiento.
