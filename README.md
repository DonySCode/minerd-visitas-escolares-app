# Supervisión Escolar MINERD

## Descripción

**Supervisión Escolar MINERD** es una aplicación móvil desarrollada para técnicos del Ministerio de Educación de la República Dominicana (MINERD) con el propósito de registrar y gestionar incidencias y vivencias durante visitas a las escuelas. La aplicación permite una gestión segura y organizada de los datos, facilitando el trabajo de supervisión escolar.

## Funcionalidades

### Registro de Incidencias

- Permite a los usuarios ingresar y guardar registros con los siguientes datos:
  - Título
  - Centro Educativo
  - Regional
  - Distrito
  - Fecha
  - Descripción
  - Foto
  - Audio

### Visualización de Incidencias

- Listado de todas las incidencias registradas.
- Visualización detallada de cada incidencia, incluyendo la foto y la reproducción del audio.

### Función de Seguridad

- Opción para borrar todos los registros almacenados en el dispositivo en caso de emergencia.

### Tipos de Visitas

- Consulta de todos los tipos de visitas existentes y sus detalles.

### Consulta de Escuela por Código

- Muestra los detalles de una escuela al ingresar su código.

### Consulta de Director por Cédula

- Muestra la foto, nombre, apellido, fecha de nacimiento, dirección y teléfono del director al ingresar su cédula.

### Registrar Visita

- Permite registrar una visita a una escuela ingresando los siguientes datos:
  - Cédula del director
  - Código del centro
  - Motivo de la visita
  - Foto evidencia
  - Comentario
  - Nota de voz
  - Latitud
  - Longitud
  - Fecha
  - Hora

### Visitas Registradas

- Consulta de las visitas registradas por el técnico.
- Detalles de cada visita al hacer click en el listado.

### Mapa de Visitas

- Muestra un mapa con las visitas realizadas por el técnico.
- Detalles de la visita al hacer click en el mapa.

### Noticias

- Noticias importantes para el técnico según el MINERD.

### Estado del Clima

- Muestra el clima en la ubicación del técnico utilizando una API.

### Horóscopo

- Muestra el horóscopo del día para el técnico.

## Instalación

### Requisitos

- Node.js
- React Native CLI
- Android Studio (para emular dispositivos Android)

### Pasos

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/minerd-visitas-escolares.git
   cd minerd-visitas-escolares
   ```
