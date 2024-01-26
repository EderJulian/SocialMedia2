# Proyecto de API REST con MongoDB, Express y Node.js

Este proyecto tiene como objetivo desarrollar una API REST para gestionar usuarios, publicaciones (posts), comentarios y likes. Utilizaremos MongoDB con Mongoose para la base de datos y Express para el desarrollo del servidor en Node.js.

## Tecnologías Utilizadas

[![MongoDB](https://img.shields.io/badge/MongoDB-4.4-green)](https://www.mongodb.com/)

[![Mongoose](https://img.shields.io/badge/Mongoose-latest-blue)](https://mongoosejs.com/)

[![Express](https://img.shields.io/badge/Express-4.17.1-lightgrey)](https://expressjs.com/)

[![Node.js](https://img.shields.io/badge/Node.js-14.17.6-brightgreen)](https://nodejs.org/)

## Funcionalidades Principales

### Usuarios
- Registro de usuarios con cifrado Bcrypt.
- Inicio de sesión con generación de token JWT y uso de middleware.
- Obtención de información del usuario conectado.
- Cierre de sesión (logout).
- Validación al registrar un usuario para garantizar que se completen todos los campos requeridos.

### Posts
- Creación, actualización y eliminación de posts (autenticación requerida).
- Obtención de todos los posts con detalles de los usuarios y comentarios asociados.
- Búsqueda de posts por nombre o ID.
- Implementación de validación al crear un post para asegurar el llenado de todos los campos necesarios (excepto la imagen, que no es obligatoria).
- Paginación de 10 en 10 posts.

### Likes
- Dar y quitar like a un post.

### Comentarios
- Creación de comentarios en un post específico.

## Estructura del Proyecto

El proyecto sigue un flujo de trabajo estructurado, con la existencia de dos ramas principales en el repositorio:
- `master` o `main`: Contiene la versión estable y desplegable del proyecto.
- `develop`: Rama de desarrollo, donde se realizan las fusiones y pruebas antes de pasar a la rama principal.

## Despliegue en Producción

La API está diseñada para ser desplegada en un entorno de producción, asegurando así la disponibilidad y rendimiento requeridos.

## Uso del Repositorio

El código fuente se encuentra disponible en un repositorio público de GitHub. Se valora la existencia de ramas, así como commits con mensajes descriptivos y de calidad legible. Asegúrese de revisar el README completo para obtener información detallada sobre la configuración y ejecución del proyecto.

## Endpoints

### Posts
- `POST /posts`: Crear un post (autenticación requerida).
- `PUT /posts/:postId`: Actualizar un post (autenticación requerida).
- `DELETE /posts/:postId`: Eliminar un post (autenticación requerida).
- `GET /posts`: Obtener todos los posts con usuarios y comentarios.
- `GET /posts/search?name={nombre}`: Buscar posts por nombre.
- `GET /posts/:postId`: Buscar un post por ID.
- Validación al crear un post para completar todos los campos requeridos.
- Paginación de 10 en 10 posts.

### Likes
- `POST /posts/:postId/like`: Dar like a un post.
- `DELETE /posts/:postId/like`: Quitar like a un post.

### Comments
- `POST /posts/:postId/comments`: Crear un comentario en un post.

### Usuarios
- `POST /users/register`: Registrar un usuario utilizando Bcrypt.
- `POST /users/login`: Iniciar sesión (Bcrypt + JWT).
- `GET /users/me`: Obtener información del usuario conectado.
- `POST /users/logout`: Cierre de sesión.
- Validación al registrar un usuario para completar todos los campos requeridos.

### Middleware
- Comprobación de la autoría del post al editar/eliminar el mismo.
