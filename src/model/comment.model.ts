import mongoose, { Schema } from "mongoose";
import {reactionSchema,Reaction } from "./reaction.model";  // Importa el esquema de comentarios


export interface Comment {
    //idComment: string,
    comment: string,

}

export interface Reply {
    reply: string,
    id_owner: string,
    parent: string,
}


export interface CommentDocument extends Comment, mongoose.Document{
    createdAt: Date,
    updateAt: Date,
    deleteAt: Date,
    reactions: Reaction[],
}

export const commentSchema = new mongoose.Schema({
    //idComment: { type: String, required: true },
    comment: { type: String, required: true },
    id_owner: { type: String,required: true},
    parent: { type: String, required: true},
    reactions: [reactionSchema]
});

const Comment = mongoose.model<CommentDocument>("Replies", commentSchema);
export default Comment;