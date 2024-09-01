import mongoose, { Schema } from "mongoose";

export interface Comment {
    idComment: string,
    comment: string,
}


export interface CommentDocument extends Comment, mongoose.Document{
    createdAt: Date,
    updateAt: Date,
    deleteAt: Date,
}

export const commentSchema = new mongoose.Schema({
    idComment: { type: String, required: true },
    comment: { type: String, required: true },
    reactions: [{
        type: mongoose.Schema.ObjectId,
        ref: "Reaction"
    }]
});
