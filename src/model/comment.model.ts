import mongoose from "mongoose";
import {reactionSchema,Reaction } from "./reaction.model";


export interface Comment {
    comment: string,
    reply?: string,
    id_owner?: string,
    parent?: string

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
    comment: { type: String, required: true },
    id_owner: { type: String},
    parent: { type: mongoose.Schema.ObjectId},
    reactions: [reactionSchema]
});

const Comment = mongoose.model<CommentDocument>("Replie",commentSchema);
export default Comment;