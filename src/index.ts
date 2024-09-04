import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { router as comment } from './routes/comment';
import { router as user } from './routes/user';
import { router as reaction } from './routes/reaction'; 
import { db } from './config/db'; 

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const app: Express = express(); 

app.use(express.json()); // Middleware para parsear cuerpos de solicitud JSON
app.use(express.urlencoded({ extended: true })); // Middleware para parsear cuerpos de solicitud URL-encoded

const port = process.env.PORT; 

// Ruta raíz del servidor
app.get('/', (req: Request, res: Response) => {
    res.send('Bienvenido a Twitter 2.0');
});

// Configuración de las rutas de la API
app.use('/api/users', user); // Ruta para las operaciones relacionadas con usuarios
app.use('/api/reactions', reaction); // Ruta para las operaciones relacionadas con reacciones
app.use('/api/comments', comment); // Ruta para las operaciones relacionadas con comentarios

// Conectar a la base de datos y luego iniciar el servidor
db.then(() => {
    app.listen(port, () => {
        console.log(`Service is running on port ${port}`);
    });
}).catch((error) => {
    console.error('Error connecting to the database:', error);
});
