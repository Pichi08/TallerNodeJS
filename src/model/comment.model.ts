import mongoose, { Schema } from "mongoose";

export interface CommentInput {
    comment: String
}

export interface CommentDocument extends CommentInput, mongoose.Document {
    createdAt: Date,
    updateAt: Date,
    deleteAt: Date,
}

const commentSchema = new mongoose.Schema({
    writer: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {type: String, required: true },
    reactions: [{
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
    }]
}, {timestamps: true, collection: "users"});

const Comment = mongoose.model<CommentDocument>("Comment", commentSchema);

export default Comment;