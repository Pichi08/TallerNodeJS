import mongoose from "mongoose";
// Definimos el esquema de Mongoose para las reacciones
export const reactionSchema = new mongoose.Schema({
    reaction: { type: String, required: true }, // Tipo de reacción, obligatorio
    id_owner: { type: String, required: true }, // ID del propietario, obligatorio
    commentId: { type: String, required: true }, // ID del comentario, obligatorio
}, { timestamps: true });
// Creamos y exportamos el modelo de Mongoose usando el esquema definido
const Reaction = mongoose.model("Reaction", reactionSchema);
export default Reaction;
