import mongoose from "mongoose";
// Importamos el esquema de reacción y la interfaz Reaction del archivo reaction.model
import { reactionSchema } from "./reaction.model";
// Definimos el esquema de Mongoose para los comentarios
export const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true }, // Contenido del comentario, obligatorio
    id_owner: { type: String }, // ID del propietario
    parent: { type: mongoose.Schema.ObjectId }, // ID del comentario padre
    reactions: [reactionSchema] // Array de reacciones, usando el esquema importado
});
// Creamos y exportamos el modelo de Mongoose usando el esquema definido
const Comment = mongoose.model("Replie", commentSchema);
export default Comment;
