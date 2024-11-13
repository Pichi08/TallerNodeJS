"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("@apollo/server");
const express4_1 = require("@apollo/server/express4");
const promises_1 = require("node:fs/promises");
const resolvers_1 = require("./graphql/users/resolvers");
const comment_1 = require("./routes/comment");
const user_1 = require("./routes/user");
const reaction_1 = require("./routes/reaction");
const db_1 = require("./config/db");
dotenv_1.default.config(); // Cargar las variables de entorno desde el archivo .env
const app = (0, express_1.default)();
app.use(express_1.default.json()); // Middleware para parsear cuerpos de solicitud JSON
app.use(express_1.default.urlencoded({ extended: true })); // Middleware para parsear cuerpos de solicitud URL-encoded
const port = process.env.PORT;
let typeDefs = await (0, promises_1.readFile)("./src/graphql/users/schema.graphql", 'utf-8');
const apolloServer = new server_1.ApolloServer({ typeDefs, resolvers: resolvers_1.resolvers });
await apolloServer.start();
app.use('/graphql', (0, express4_1.expressMiddleware)(apolloServer));
// Ruta raíz del servidor
app.get('/', (req, res) => {
    res.send('Bienvenido a Twitter 2.0');
});
// Configuración de las rutas de la API
app.use('/api/users', user_1.router); // Ruta para las operaciones relacionadas con usuarios
app.use('/api/reactions', reaction_1.router); // Ruta para las operaciones relacionadas con reacciones
app.use('/api/comments', comment_1.router); // Ruta para las operaciones relacionadas con comentarios
// Conectar a la base de datos y luego iniciar el servidor
db_1.db.then(() => {
    app.listen(port, () => {
        console.log(`Service is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});
