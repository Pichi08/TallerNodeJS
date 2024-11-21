# Proyecto NODEJS - GraphQL Edition

## Integrantes
- Daniel Escobar Vacaflor
- Jacobo Ossa Guarnizo

## Descripción

Este proyecto consiste en desarrollar una aplicación backend robusta utilizando Node.js y TypeScript, junto con MongoDB para la persistencia de datos. En esta versión, las solicitudes y operaciones CRUD ahora se realizan a través de **GraphQL**, proporcionando una interfaz flexible para consultar y manipular datos de usuarios, comentarios y reacciones. Además, incluye un sistema de autenticación y control de acceso basado en roles.

---

## Configuración y dependencias
Para garantizar un entorno de desarrollo consistente y eficiente, se emplearon diversos paquetes tanto para el entorno de producción como de desarrollo. Algunas de las dependencias utilizadas son:

- *Express*: Framework para Node.js utilizado para la creación del servidor y la gestión de rutas.
- *Mongoose*: Librería para la modelación de datos en MongoDB.
- *dotenv*: Paquete para gestionar variables de entorno.
- *bcryptjs*: Utilizado para la encriptación de contraseñas.
- *jsonwebtoken*: Implementación de tokens de autenticación.
- *Nodemon*: Herramienta para el desarrollo que reinicia automáticamente la aplicación cuando se detectan cambios en el código fuente.


---

## Tecnologías

- **Node.js**: Plataforma para ejecutar JavaScript del lado del servidor.
- **TypeScript**: Lenguaje con tipado estático para mayor robustez.
- **GraphQL**: Permite realizar consultas y mutaciones dinámicas y personalizadas.
- **MongoDB**: Base de datos NoSQL para la persistencia de información.
- **GraphQL Resolvers**: Lógica para manejar consultas y mutaciones.
- **JWT (JSON Web Tokens)**: Para autenticación y manejo de sesiones.

---

## Funcionalidades

### Queries
- `user(id: ID!)`: Obtiene información de un usuario por su ID.
- `users`: Lista todos los usuarios registrados.
- `userSearchByEmail(email: String!)`: Busca un usuario por su correo electrónico.
- `comments`: Devuelve una lista de comentarios con sus relaciones (usuario, reacciones, respuestas).

### Mutations
- `createUser(input: CreateUserInput!)`: Registra un nuevo usuario.
- `login(input: LoginInput!)`: Autentica un usuario y genera un token JWT.
- Otras mutaciones permiten gestionar comentarios, reacciones y relaciones entre entidades.

---

## Estructura del Proyecto

- **src/config**: Configuración general del proyecto (puertos, MongoDB, JWT).
- **src/middlewares**: Middleware para autenticación y validación.
- **src/graphql**: 
  - `schema.graphql`: Define el esquema GraphQL (tipos, queries, mutaciones).
  - `resolvers.ts`: Implementa la lógica para manejar las solicitudes de GraphQL.
- **src/controllers**: Controladores para operaciones específicas.
- **src/model**: Modelos de datos en MongoDB.
- **src/services**: Lógica de negocio para usuarios, comentarios y reacciones.
- **src/routes**: (Herencia del sistema HTTP, no usado directamente en GraphQL).

---

## Autenticación y Control de Roles

- **Autenticación**: 
  - Utiliza JWT para validar usuarios y proteger recursos.
  - El endpoint de login devuelve un token que debe incluirse en las cabeceras de las solicitudes GraphQL.

- **Control de Roles**:
  - Implementado a través de la función `checkRole`, que valida si un usuario tiene los permisos necesarios antes de ejecutar operaciones sensibles.

---

## Como iniciar

Para configurar y ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio: git clone [https://github.com/Pichi08/TallerNodeJS.git](https://github.com/Pichi08/TallerNodeJS.git)
2. Entra al repositorio: cd TallerNodeJS 
3. Eliminar nodemon: yarn remove nodemon
4. Descargar nodemon: yarn add nodemon -D
5. Construye el yarn: yarn build
6. Configura las variables de entorno creando un archivo .env en la raíz del proyecto y añade las siguientes variables como  ya se había especificado antes. 
7. Ejecuta el servidor: yarn dev

## Documentacion de la API

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

## Queries

**Obtener un Usuario por ID**

- **Descripción**: Devuelve los detalles de un usuario específico.
- **Tipo**: Query
- **Endpoint**: GraphQL `/graphql`
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
query {
  user(id: "63f8f8b3c3e3f1e7e4a6f7f8") {
    id
    name
    email
    rol
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "user": {
      "id": "63f8f8b3c3e3f1e7e4a6f7f8",
      "name": "Juan Pérez",
      "email": "juan.perez@example.com",
      "rol": "user"
    }
  }
}
```

**Listar Usuarios**

- **Descripción**: Devuelve una lista de todos los usuarios registrados.
- **Tipo**: Query
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
query {
  users {
    id
    name
    email
    rol
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "users": [
      {
        "id": "63f8f8b3c3e3f1e7e4a6f7f8",
        "name": "Juan Pérez",
        "email": "juan.perez@example.com",
        "rol": "user"
      },
      {
        "id": "63f8f8b4c4e3f2e7e4a6f7f9",
        "name": "Ana López",
        "email": "ana.lopez@example.com",
        "rol": "admin"
      }
    ]
  }
}
```

**Buscar Usuario por Email**

- **Descripción**: Encuentra un usuario por su correo electrónico.
- **Tipo**: Query
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
query {
  userSearchByEmail(email: "juan.perez@example.com") {
    id
    name
    email
    rol
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "userSearchByEmail": {
      "id": "63f8f8b3c3e3f1e7e4a6f7f8",
      "name": "Juan Pérez",
      "email": "juan.perez@example.com",
      "rol": "user"
    }
  }
}
```

**Listar Comentarios**

- **Descripción**: Devuelve una lista de comentarios con detalles de usuario, reacciones y respuestas.
- **Tipo**: Query
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
query {
  comments {
    id
    comment
    user {
      name
    }
    reactions {
      reaction
    }
    replies {
      comment
    }
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "comments": [
      {
        "id": "12345",
        "comment": "Este es un comentario",
        "user": {
          "name": "Juan Pérez"
        },
        "reactions": [
          {
            "reaction": "Me gusta"
          }
        ],
        "replies": [
          {
            "comment": "Esta es una respuesta"
          }
        ]
      }
    ]
  }
}
```

### Mutations

1. **Crear Usuario**
    - **Descripción**: Crea un nuevo usuario y devuelve su token de autenticación.
    - **Tipo**: Mutation
    - **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  createUser(input: {
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    password: "1234",
    rol: "user"
  }) {
    email
    token
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "createUser": {
      "email": "juan.perez@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5..."
    }
  }
}
```

**Iniciar Sesión**

- **Descripción**: Autentica un usuario y devuelve un token de acceso.
- **Tipo**: Mutation
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  login(input: {
    email: "juan.perez@example.com",
    password: "1234"
  }) {
    email
    token
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "login": {
      "email": "juan.perez@example.com",
      "token": "eyJhbGciOiJIUzI1NiIsInR5..."
    }
  }
}
```

**Crear Comentario**

- **Descripción**: Agrega un nuevo comentario a la base de datos.
- **Tipo**: Mutation
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  createComment(input: {
    comment: "Este es un comentario",
    userId: "63f8f8b3c3e3f1e7e4a6f7f8"
  }) {
    id
    comment
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "createComment": {
      "id": "12345",
      "comment": "Este es un comentario"
    }
  }
}
```

**Actualizar Usuario (`updateUser`)**

- **Descripción**: Actualiza los datos de un usuario existente.
- **Tipo**: Mutation
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  updateUser(id: "63f8f8b3c3e3f1e7e4a6f7f8", input: {
    name: "Juan Actualizado",
    email: "juan.actualizado@example.com",
    rol: "admin"
  }) {
    id
    name
    email
    rol
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "updateUser": {
      "id": "63f8f8b3c3e3f1e7e4a6f7f8",
      "name": "Juan Actualizado",
      "email": "juan.actualizado@example.com",
      "rol": "admin"
    }
  }
}
```

**Eliminar Usuario (`deleteUser`)**

- **Descripción**: Elimina un usuario por su ID.
- **Tipo**: Mutation
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  deleteUser(id: "63f8f8b3c3e3f1e7e4a6f7f8") {
    id
    name
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "deleteUser": {
      "id": "63f8f8b3c3e3f1e7e4a6f7f8",
      "name": "Juan Pérez"
    }
  }
}
```

**Actualizar Comentario (`updateComment`)**

- **Descripción**: Actualiza el contenido de un comentario existente.
- **Tipo**: Mutation
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  updateComment(id: "12345", input: {
    comment: "Este comentario fue actualizado"
  }) {
    id
    comment
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "updateComment": {
      "id": "12345",
      "comment": "Este comentario fue actualizado"
    }
  }
}

```

**Eliminar Comentario (`deleteComment`)**

- **Descripción**: Elimina un comentario por su ID.
- **Tipo**: Mutation
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  deleteComment(id: "12345") {
    id
    comment
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "deleteComment": {
      "id": "12345",
      "comment": "Este es un comentario"
    }
  }
}
```

**Responder Comentario (`answerComment`)**

- **Descripción**: Crea una respuesta a un comentario existente.
- **Tipo**: Mutation
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  answerComment(id: "12345", input: {
    comment: "Esta es una respuesta"
  }) {
    id
    comment
    replies {
      id
      comment
    }
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "answerComment": {
      "id": "12345",
      "comment": "Este es un comentario",
      "replies": [
        {
          "id": "67890",
          "comment": "Esta es una respuesta"
        }
      ]
    }
  }
}
```

**Crear Reacción (`createReaction`)**

- **Descripción**: Agrega una reacción a un comentario.
- **Tipo**: Mutation
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  createReaction(input: {
    commentId: "12345",
    reaction: "Me gusta"
  }) {
    id
    reaction
  }
}
```

**Respuesta**

```bash
{
  "data": {
    "createReaction": {
      "id": "98765",
      "reaction": "Me gusta"
    }
  }
}
```

**Eliminar Reacción (`deleteReaction`)**

- **Descripción**: Elimina una reacción por su ID.
- **Tipo**: Mutation
- **Ejemplo de Consulta**:

**Ejemplo Estructura**

```bash
mutation {
  deleteReaction(id: "98765") {
    id
    reaction
  }
}
```

**Respuesta**

```bash
mutation {
  deleteReaction(id: "98765") {
    id
    reaction
  }
}
```
