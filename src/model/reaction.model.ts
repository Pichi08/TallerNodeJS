import mongoose from "mongoose";

// Definimos una interfaz para los datos de entrada de una reacción
export interface ReactionInput {
    reaction: string;  // La reaccion
    commentId: string; // ID del comentario al que se está reaccionando
    id_owner: string;  // ID del usuario que está haciendo la reacción
}

// Interfaz que representa una reacción sin el commentId
export interface Reaction{
    reaction: string;  // El tipo de reacción
    id_owner: string;  // ID del usuario que hizo la reacción
}

// Interfaz que añade propiedades de documento de Mongoose
export interface ReactionDocument extends ReactionInput, mongoose.Document {
    createdAt: Date,  // Fecha de creación de la reacción
    updatedAt: Date,  // Fecha de última actualización de la reacción
}

// Definimos el esquema de Mongoose para las reacciones
export const reactionSchema = new mongoose.Schema({
    reaction: { type: String, required: true },  // Tipo de reacción, obligatorio
    id_owner: { type: String, required: true },  // ID del propietario, obligatorio
    commentId: { type: String, required: true }, // ID del comentario, obligatorio
}, { timestamps: true });

// Creamos y exportamos el modelo de Mongoose usando el esquema definido
const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;