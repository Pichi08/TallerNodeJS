import mongoose from "mongoose";
import { commentSchema, Comment } from "./comment.model";  // Importa el esquema de comentarios

export interface UserInput {
    name: string,
    email: string,
    password: string
}


export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date,
    updateAt: Date,
    deleteAt: Date,
    comments: Comment[],
}

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, index: true, unique: true },
    password: { type: String, required: true },
    comments: [commentSchema]  // Usa el esquema importado
}, { timestamps: true, collection: "users" });

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
