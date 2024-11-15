import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { ApolloServer } from '@apollo/server';
import {expressMiddleware as apolloMiddleware} from '@apollo/server/express4' 
import { readFile } from 'node:fs/promises';
import { resolvers } from "./graphql/resolvers.js";
import cors from 'cors';

//import { router as comment } from './routes/comment';
//import { router as user } from './routes/user';
//simport { router as reaction } from './routes/reaction'; 
import { db } from './config/db.js'; 

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const app: Express = express(); 

app.use(express.json()); // Middleware para parsear cuerpos de solicitud JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear cuerpos de solicitud URL-encoded

app.use(cors())


const port = process.env.PORT; 

let typeDefs = await readFile("./src/graphql/schema.graphql", 'utf-8'); 

const apolloServer  =  new ApolloServer({typeDefs, resolvers, 
    
    formatError: (error) => {
    return{
        message: error.message,
        path: error.path
    }
}}); 
await apolloServer.start();

async function getContext({ req }: { req: Request }) {
    const token = req.headers.authorization?.replace("Bearer ", "");

    const operationName = req.body.operationName;
    if (operationName === "LoginUser") {
        return {};
    }

    if (!token) {
        throw new Error("Unauthorized");
    }

    try {
        // Verificar el token y obtener el userId
        const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
        return { user: decodedToken };
    } catch (error) {
        throw new Error("Unauthorized or Token expired");
    }
}



app.use('/graphql', apolloMiddleware(apolloServer, {context: getContext }))

// Ruta raíz del servidor
app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenido a Twitter 2.0');
});

// Configuración de las rutas de la API
//app.use('/api/users', user); // Ruta para las operaciones relacionadas con usuarios
//app.use('/api/reactions', reaction); // Ruta para las operaciones relacionadas con reacciones
//app.use('/api/comments', comment); // Ruta para las operaciones relacionadas con comentarios

// Conectar a la base de datos y luego iniciar el servidor
db.then(() => {
    app.listen(port, () => {
        console.log(`Service is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});
