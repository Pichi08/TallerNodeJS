import mongoose, { Schema, Document } from "mongoose";

export interface ReactionInput {
    reaction: string; 
    commentOwner: mongoose.Types.ObjectId; 
    comment: mongoose.Types.ObjectId; 

}

export interface ReactionDocument extends ReactionInput, Document {
    createdAt: Date,
    updatedAt: Date,
    owner: mongoose.Types.ObjectId; 

}

const reactionSchema = new Schema<ReactionDocument>({
    reaction: { type: String, required: true }, 
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    commentOwner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
    comment: { type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: true }, 
}, { timestamps: true }); 

const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;
