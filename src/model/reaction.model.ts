import mongoose, { Schema } from "mongoose";


export interface ReactionDocument extends mongoose.Document {
    createdAt: Date,
    updateAt: Date,
    deleteAt: Date,
}

const reactionSchema = new mongoose.Schema({
    reaction: String,
    ownerComment: {
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }
}, {timestamps: true, collection: "users"});

const Reaction = mongoose.model<ReactionDocument>("Reaction", reactionSchema);

export default Reaction;