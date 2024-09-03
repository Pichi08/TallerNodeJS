import mongoose, { Schema, Document } from "mongoose";

export interface ReactionInput {
    reaction: string; 
    commentId: string;
    id_owner: string; 
}

export interface Reaction{
    reaction: string; 
    id_owner: string;
}

export interface ReactionDocument extends ReactionInput, mongoose.Document {
    createdAt: Date,
    updatedAt: Date,
}

export const reactionSchema = new mongoose.Schema({
    reaction: { type: String, required: true }, 
    id_owner: { type:  String,required: true },
    commentId: { type: String, required: true }, 
}, { timestamps: true }); 

const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;
