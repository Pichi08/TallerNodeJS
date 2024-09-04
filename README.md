# Proyecto NODEJS
## Integrantes
- Daniel Escobar Vacaflor
- Jacobo Ossa Guarnizo
## Descripción
El proyecto consiste en desarrollar una aplicación backend sólida utilizando Node.js junto con TypeScript para garantizar un tipado fuerte, y MongoDB como base de datos para la persistencia de la información. La aplicación está diseñada para permitir operaciones CRUD (Crear, Leer, Actualizar y Eliminar) sobre entidades como usuarios y comentarios. Adicionalmente, incluye un sistema de autenticación de usuarios para gestionar el acceso a diferentes funcionalidades, y una lógica específica para la creación y respuesta a comentarios. La administración de usuarios está restringida, de manera que solo los usuarios con el rol de superadmin tienen la capacidad de crear nuevos usuarios en la plataforma, asegurando así un control estricto sobre el acceso y la gestión de cuentas.
## Configuración y dependencias
Para garantizar un entorno de desarrollo consistente y eficiente, se emplearon diversos paquetes tanto para el entorno de producción como de desarrollo. Algunas de las dependencias utilizadas son:

- *Express*: Framework para Node.js utilizado para la creación del servidor y la gestión de rutas.
- *Mongoose*: Librería para la modelación de datos en MongoDB.
- *dotenv*: Paquete para gestionar variables de entorno.
- *bcryptjs*: Utilizado para la encriptación de contraseñas.
- *jsonwebtoken*: Implementación de tokens de autenticación.
- *Nodemon*: Herramienta para el desarrollo que reinicia automáticamente la aplicación cuando se detectan cambios en el código fuente.


## *Base de Datos*

Para configurar el proyecto, es necesario crear un archivo .env por fuera de todas las carpetas el cual debe contener:

- *PORT=XXXX*: Define el puerto en el que la aplicación se ejecutará.
- *MONGO_URL=XXXXXXXXXXXXX*: Proporciona la URL de conexión a la base de datos MongoDB. Esta URL incluye las credenciales y el enlace al clúster donde se almacenan los datos. Asegúrate de proteger esta información y actualizarla si es necesario.
- *JWT_SECRET=XXXXXXXXXX*: Especifica la clave secreta utilizada para la firma y verificación de los tokens JWT (JSON Web Tokens). Esta clave es crucial para garantizar la seguridad de los tokens y prevenir la falsificación.


## Tecnologias utilizadas

- **Node.js:** Entorno de ejecución para JavaScript en el servidor.
- **TypeScript:** Superset de JavaScript que añade tipos estáticos.
- **MongoDB:** Base de datos NoSQL para la persistencia de datos.
- **Express:** Framework de Node.js para aplicaciones web.
- **JWT:** Tokens de JSON para la autenticación y autorización de usuarios.
- **Bcrypt:** Librería para hashing de contraseñas.
- **Zod:** Librería para validación de datos.

## Estructura del proyecto

El proyecto está organizado de la siguiente manera:

- models/: Define los modelos de datos para usuarios y eventos.
- services/: Lógica de negocio para manejar las operaciones CRUD.
- controllers/: Controladores para manejar las solicitudes y respuestas HTTP.
- middlewares/: Middlewares para la autenticación, autorización y validación de datos.
- schemas/: Esquemas Zod para la validación de datos.
- routes/: Rutas de la aplicación Express.



## Como iniciar

Para configurar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio: git clone [https://github.com/Pichi08/TallerNodeJS.git](https://github.com/Pichi08/TallerNodeJS.git)
2. Entra al repositorio: cd TallerNodeJS 
3. Eliminar nodemon: yarn remove nodemon
4. Descargar nodemon: yarn add nodemon -D
5. Construye el yarn: yarn build
6. Configura las variables de entorno creando un archivo .env en la raíz del proyecto y añade las siguientes variables como  ya se había especificado antes. 
7. Ejecuta el servidor: yarn dev

## Documentación de la API

La API soporta las siguientes operaciones:

- *Usuarios*
    - Login
    - Creación, actualización y eleminación de usuarios (solo admin).
    - Obtención de la lista de usuarios.
- *Comentarios*
    - Creación, listado, edición y eliminación de eventos.
    - Hacer comentarios.
    - Contestar comentarios
- *Reacciones*
    - Creación y eliminación de usuarios.

Las rutas específicas y ejemplos de uso se encuentran documentadas en el archivo Postman_collection.json incluido en el repositorio. Aun así, las rutas disponibles son (todas iniciando con localhost:3001 si está local):

### Usuarios

- api/users/login | post | login a la aplicación
- api/users/ | post | crear un usuario
- api/users/:idUser | put | actualizar un usuario
- api/users/:idUser | delete | eliminar un usuario
- api/users/ | get | obtener todos los usuarios

### Comentarios

- api/comment/ | post | crear un comentario
- api/comment/reply | post | contestar a un comentario
- api/comment/:idComment | delete | eliminar un comentario
- api/comment/:idComment | pul | actualizar un comentario
- api/comment/ | get | get | obtener todos los comentarios con sus respuestas y reacciones

### Reacciones

- api/reactions/ | post | crear una reacción
- api/reactions/ | delete | eliminar una reacción

---

## Desafios y elementos pendientes

- Integración de pruebas unitarias y de integración.
- Mejora en el sistema de logging para depuración y monitoreo.
