import mongoose from "mongoose";
// Importamos el esquema de comentarios y la interfaz Comment del archivo comment.model
import { commentSchema, Comment } from "./comment.model.js";

// Definimos una interfaz para los datos de entrada de un usuario
export interface UserInput {
    name: string,     // Nombre del usuario
    email: string,    // Correo electrónico del usuario
    password: string, // Contraseña del usuario
    rol: string;      // Rol del usuario
}

export interface LoginInput{
    email: string,
    password: string
}

// Interfaz que extiende UserInput y añade propiedades de documento de Mongoose
export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date,
    updateAt: Date,     
    deleteAt: Date,     
    comments: Comment[], // Array de comentarios del usuario
}

// Definimos el esquema de Mongoose para los usuarios
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },  // Nombre del usuario, obligatorio
    email: { type: String, required: true, index: true, unique: true },  // Email, obligatorio, indexado y único
    password: { type: String, required: true },  // Contraseña, obligatoria
    rol: {type: String, default: 'user', required: true, enum: ['superadmin','user']},  // Rol, obligatorio, con valores permitidos
    comments: [commentSchema]  // Array de comentarios, usando el esquema importado
}, { timestamps: true, collection: "users" });

// Creamos y exportamos el modelo de Mongoose usando el esquema definido
const User = mongoose.model<UserDocument>("User", userSchema);

export default User;