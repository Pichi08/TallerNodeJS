import mongoose, { Schema } from "mongoose";

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
}

export const commentSchema = new mongoose.Schema({
    //idComment: { type: String, required: true },
    comment: { type: String, required: true },
    id_owner: { type: String},
    parent: { type: String},
    reactions: [{
        type: mongoose.Schema.ObjectId,
        ref: "Reaction"
    }]
});

const Comment = mongoose.model<CommentDocument>("Replies", commentSchema);
export default Comment;