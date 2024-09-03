import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { router as comment} from './routes/comment';
import { router as user } from './routes/user'
import { router as reaction } from './routes/reaction'
import { db } from './config/db';

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = process.env.PORT;

app.get('/', (req: Request, res:Response)=>{
    res.send('Bienvenido a Twitter 2.0');

});

app.use('/api/users', user);
app.use('/api/reactions', reaction);
app.use('/api/comments', comment);


db.then( () => {
    app.listen(port, () => {
        console.log(`Service is running on port ${port}`);
    });
})
