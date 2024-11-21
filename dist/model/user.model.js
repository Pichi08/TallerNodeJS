import mongoose from "mongoose";
// Importamos el esquema de comentarios y la interfaz Comment del archivo comment.model
import { commentSchema } from "./comment.model.js";
// Definimos el esquema de Mongoose para los usuarios
const userSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Nombre del usuario, obligatorio
    email: { type: String, required: true, index: true, unique: true }, // Email, obligatorio, indexado y único
    password: { type: String, required: true }, // Contraseña, obligatoria
    rol: { type: String, default: 'user', required: true, enum: ['admin', 'user'] }, // Rol, obligatorio, con valores permitidos
    comments: [commentSchema] // Array de comentarios, usando el esquema importado
}, { timestamps: true, collection: "users" });
// Creamos y exportamos el modelo de Mongoose usando el esquema definido
const User = mongoose.model("User", userSchema);
export default User;
