import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Definimos la cadena de conexión a MongoDB
const connectionString = process.env.MONGO_URL || "mongodb://localhot:21017/nodejs";
// La función connect devuelve una promesa, por lo que usamos .then() y .catch()
export const db = mongoose.connect(connectionString)
    .then(
// Si la conexión es exitosa, mostramos un mensaje en la consola
() => console.log("Connected to MongoDB")).catch(
// Si hay un error en la conexión, lo mostramos en la consola
(err) => console.log(err));
