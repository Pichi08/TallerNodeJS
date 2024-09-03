import UserModel from "../model/user.model";
import CommentModel from "../model/comment.model";
import mongoose from "mongoose";
class ReactionService {


    public async createReaction(reaction:string, commentId: string, userId: string) {
        const userWithComment = await UserModel.findOne(
            { "comments._id": commentId }
        );
        if(userWithComment){

                const newReaction = {
                    reaction: reaction,
                    id_owner: userId
                };
                const updatedUser = await UserModel.findOneAndUpdate(
                    {_id: userWithComment._id, "comments._id": commentId},
                    { $push: { "comments.$.reactions": newReaction } },
                    { new: true }
                );

                return updatedUser;
        }else{
            const newReaction = {
                reaction: reaction,
                id_owner: userId
            };
            const updatedUser = await CommentModel.findOneAndUpdate(
                { _id: commentId },
                { $push: { reactions: newReaction } },
                { new: true }
            );

            return updatedUser;
        }
    }

    public async deleteReaction(reactionId: string, userId: string, commentParentId: string) {
        const commentWithReaction = await UserModel.findOne(
            {
                'comments._id': commentParentId,
                'comments.reactions._id': reactionId
            },
            { 'comments.$': 1 }
        );
    
        if (commentWithReaction) {
            const deletedReaction = await UserModel.findOneAndUpdate(
                {
                    _id: commentWithReaction._id,
                    'comments._id': commentParentId,
                    'comments.reactions': {
                        $elemMatch: {
                            _id: new mongoose.Types.ObjectId(reactionId),
                            id_owner: userId 
                        }
                    }
                },
                {
                    $pull: {
                        'comments.$.reactions': {
                            _id: new mongoose.Types.ObjectId(reactionId),
                            id_owner: userId 
                        }
                    }
                },
                { new: true }
            );
            
            if (deletedReaction) {
                return { success: true, message: "Reacción eliminada correctamente." };
            } else {
                return { success: false, message: "No se pudo eliminar la reacción." };
            }
    
        } else {
            const deletedReaction = await CommentModel.findOneAndUpdate(
                {
                    _id: commentParentId,
                    'reactions': {
                        $elemMatch: {
                            _id: new mongoose.Types.ObjectId(reactionId),
                            id_owner: userId 
                        }
                    }
                },
                {
                    $pull: {
                        'reactions': {
                            _id: new mongoose.Types.ObjectId(reactionId),
                            id_owner: userId 
                        }
                    }
                },
                { new: true }
            );

            if (deletedReaction) {
                return { success: true, message: "Reacción eliminada correctamente." };
            } else {
                return { success: false, message: "No se pudo eliminar la reacción." };
            }
                
        }
    }
    
}

export default new ReactionService;
