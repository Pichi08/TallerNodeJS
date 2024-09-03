import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';

//importar la variable router de posts
import { router as comment} from './routes/comment';
import { router as user } from './routes/user'
import { router as reaction } from './routes/reaction'
import { db } from './config/db';

dotenv.config();

const app: Express = express();

//Para especificar que estamos usando json
app.use(express.json());
//Enviar variables por post, me permite tenes lo que estoy enviando como descodificada
app.use(express.urlencoded({extended: true}));

const port = 3000;

app.get('/', (req: Request, res:Response)=>{
    res.send('Esto funciona crack?');

});

app.use('/api/users', user);
app.use('/api/reactions', reaction);
app.use('/api/comments', comment);


db.then( () => {
    app.listen(port, () => {
        console.log(`Service is running on port ${port}`);
    });
})
