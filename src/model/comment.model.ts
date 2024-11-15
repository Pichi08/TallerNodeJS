import mongoose from "mongoose";
// Importamos el esquema de reacción y la interfaz Reaction del archivo reaction.model
import {reactionSchema, Reaction } from "./reaction.model.js";

// Definimos una interfaz para la estructura básica de un comentario
export interface Comment {
    comment: string,    // El contenido del comentario
    reply?: string,     // La respuesta
    id_owner?: string,  // ID del usuario que hizo el comentario
    parent?: string     // ID del comentario padre, si es una respuesta (opcional)
}

// Definimos una interfaz específica para las respuestas
export interface Reply {
    reply: string,      // El contenido de la respuesta
    id_owner: string,   // ID del usuario que hizo la respuesta
    parent: string,     // ID del comentario al que se está respondiendo
}

// Interfaz que extiende Comment y añade propiedades de documento de Mongoose
export interface CommentDocument extends Comment, mongoose.Document {
    createdAt: Date,
    updateAt: Date,    
    deleteAt: Date,     
    reactions: Reaction[], // Array de reacciones al comentario
}

// Definimos el esquema de Mongoose para los comentarios
export const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true }, // Contenido del comentario, obligatorio
    id_owner: { type: String },                // ID del propietario
    parent: { type: mongoose.Schema.ObjectId },// ID del comentario padre
    reactions: [reactionSchema]                // Array de reacciones, usando el esquema importado
});

// Creamos y exportamos el modelo de Mongoose usando el esquema definido
const Comment = mongoose.model<CommentDocument>("Replie", commentSchema);
export default Comment;