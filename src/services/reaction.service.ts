import UserModel from "../model/user.model.js";
import CommentModel from "../model/comment.model.js";
import mongoose from "mongoose";

class ReactionService {

    // Método para crear una reacción en un comentario
    public async createReaction(reaction: string, commentId: string, userId: string) {
        try {    
            // Buscar al usuario que tiene el comentario
            const userWithComment = await UserModel.findOne(
                { "comments._id": commentId }
            );

            console.log(userWithComment);
    
            if (userWithComment) {
                // Crear una nueva reacción
                const newReaction = {
                    reaction: reaction,
                    id_owner: userId
                };

                console.log(newReaction);
    
                // Agregar la reacción al comentario del usuario
                const updatedUser = await UserModel.findOneAndUpdate(
                    { _id: userWithComment._id, "comments._id": commentId },
                    { $push: { "comments.$.reactions": newReaction } },
                    { new: true }
                );
                return updatedUser;

            } else {
                // Si el comentario no está en los comentarios de un usuario, buscar en la colección de comentarios
                const newReaction = {
                    reaction: reaction,
                    id_owner: userId
                };
    
                // Agregar la reacción al comentario en la colección de comentarios
                const updatedComment = await CommentModel.findOneAndUpdate(
                    { _id: commentId },
                    { $push: { reactions: newReaction } },
                    { new: true }
                );
    
                if (updatedComment) {
                    return {
                        _id: updatedComment._id,
                        comment: updatedComment.comment
                    };
                } else {
                    throw new Error('Comment not found');
                }
            }
        } catch (error) {
            console.error('Error al crear reacción:', error);
            throw error;
        }
    }

    // Método para eliminar una reacción de un comentario
    public async deleteReaction(reactionId: string, userId: string, commentParentId: string) {
        // Buscar el comentario del usuario que tiene la reacción
        const commentWithReaction = await UserModel.findOne(
            {
                'comments._id': commentParentId,
                'comments.reactions._id': reactionId
            },
            { 'comments.$': 1 } // Seleccionar el comentario específico
        );

        if (commentWithReaction) {
            // Eliminar la reacción del comentario del usuario
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
                { new: true } // Retornar el documento actualizado
            );

            if (deletedReaction) {
                return { success: true, message: "Reacción eliminada correctamente." };
            } else {
                return { success: false, message: "No se pudo eliminar la reacción." };
            }
        } else {
            // Si la reacción no está en los comentarios del usuario, buscar en la colección de comentarios
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
                { new: true } // Retornar el documento actualizado
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
