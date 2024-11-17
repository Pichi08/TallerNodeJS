import UserModel from "../model/user.model.js";
import CommentModel from "../model/comment.model.js";
import mongoose from "mongoose";
class CommentService {
    // Método para crear un comentario y asociarlo a un usuario
    async createComment(idUser, comment) {
        try {
            // Buscar al usuario por su ID
            const user = await UserModel.findById(idUser);
            if (!user) {
                throw new Error("User not found"); // Lanza un error si el usuario no existe
            }
            // Crear un nuevo comentario
            const newComment = { comment: comment };
            // Agregar el comentario al array de comentarios del usuario
            user.comments.push(newComment);
            // Guardar el usuario actualizado
            await user.save();
            return user; // Retornar el documento del usuario actualizado
        }
        catch (error) {
            throw error;
        }
    }
    // Método para crear una respuesta a un comentario existente
    async createReply(idUser, comment, parent) {
        try {
            // Buscar al usuario por su ID
            const user = await UserModel.findById(idUser);
            if (!user) {
                throw new Error("User not found");
            }
            // Convertir el ID del comentario padre a ObjectId
            const parentObjectId = new mongoose.Types.ObjectId(parent);
            // Crear un nuevo documento de respuesta
            const newReply = new CommentModel({
                comment: comment,
                id_owner: idUser,
                parent: parentObjectId
            });
            // Guardar la respuesta en la base de datos
            const savedReply = await newReply.save();
            return savedReply; // Retornar el documento de la respuesta guardada
        }
        catch (error) {
            throw error;
        }
    }
    // Método para encontrar todos los usuarios con sus comentarios y respuestas
    async findAll() {
        try {
            // Realizar una agregación para desenredar comentarios y respuestas
            const users = await UserModel.aggregate([
                { $unwind: '$comments' },
                {
                    $lookup: {
                        from: 'replies', // Buscar en la colección de respuestas
                        localField: 'comments._id',
                        foreignField: 'parent',
                        as: 'comments.replies' // Asociar respuestas a los comentarios
                    }
                },
                {
                    $unwind: {
                        path: '$comments.replies',
                        preserveNullAndEmptyArrays: true
                    }
                },
                {
                    $lookup: {
                        from: 'replies',
                        localField: 'comments.replies._id',
                        foreignField: 'parent',
                        as: 'comments.replies.nested_replies' // Asociar respuestas anidadas
                    }
                },
                {
                    $group: {
                        _id: {
                            user_id: '$_id',
                            comment_id: '$comments._id'
                        },
                        comment: { $first: '$comments.comment' },
                        reactions: { $first: '$comments.reactions' },
                        replies: { $push: '$comments.replies' } // Agrupar respuestas
                    }
                },
                {
                    $project: {
                        _id: 0,
                        user_id: '$_id.user_id',
                        comment_id: '$_id.comment_id',
                        comment: 1,
                        reactions: 1,
                        replies: {
                            $cond: {
                                if: { $eq: [{ $arrayElemAt: ['$replies._id', 0] }, null] },
                                then: [],
                                else: '$replies' // Condicional para manejar respuestas vacías
                            }
                        }
                    }
                }
            ], { maxTimeMS: 60000, allowDiskUse: true });
            return users; // Retornar la lista de usuarios con comentarios y respuestas
        }
        catch (error) {
            console.error("Error while fetching users and their comments:", error);
            throw error;
        }
    }
    // Método para eliminar un comentario o respuesta
    async deleteComment(idUser, commentId) {
        try {
            // Buscar el propietario del comentario
            const commentOwner = await UserModel.findOne({ 'comments._id': commentId });
            if ((commentOwner === null || commentOwner === void 0 ? void 0 : commentOwner._id) == idUser) {
                // Si el comentario pertenece al usuario, actualizar el comentario para marcarlo como "no disponible"
                const updatedUser = await UserModel.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(idUser), 'comments._id': commentId }, { $set: { 'comments.$.comment': "comentario no disponible" } }, { new: true });
                return updatedUser; // Retornar el documento del usuario actualizado
            }
            else {
                // Buscar la respuesta en la colección de comentarios
                const reply = await CommentModel.findById(commentId);
                if ((reply === null || reply === void 0 ? void 0 : reply.id_owner) == idUser) {
                    // Si la respuesta pertenece al usuario, actualizarla para marcarla como "no disponible"
                    const updatedUser = await CommentModel.findByIdAndUpdate(commentId, { $set: { comment: "comentario no disponible" } }, { new: true });
                    return updatedUser; // Retornar el documento de la respuesta actualizada
                }
                return null; // Retornar null si no se encontró el comentario o respuesta
            }
        }
        catch (error) {
            throw error; // Lanzar error si ocurre alguna excepción
        }
    }
    // Método para actualizar un comentario o respuesta
    async updateComment(idUser, commentId, comment) {
        //console.log("Updating comment:", comment.comment);
        try {
            // Buscar el propietario del comentario
            const commentOwner = await UserModel.findOne({ 'comments._id': commentId });
            //console.log("Comment owner:", commentOwner);
            // Buscar al usuario que realiza la actualización
            const user = await UserModel.findById(idUser);
            if (!user) {
                throw new Error("User not found"); // Lanza un error si el usuario no existe
            }
            if (commentOwner) {
                if ((commentOwner === null || commentOwner === void 0 ? void 0 : commentOwner._id) == idUser) {
                    // Si el comentario pertenece al usuario, actualizar el comentario
                    const updatedUser = await UserModel.findOneAndUpdate({
                        _id: idUser,
                        'comments._id': commentId
                    }, {
                        $set: { 'comments.$.comment': comment }
                    }, {
                        new: true
                    });
                    //console.log("Updated user:", updatedUser);
                    return updatedUser; // Retornar el documento del usuario actualizado
                }
                else {
                    return null; // Retornar null si el comentario no pertenece al usuario
                }
            }
            else {
                // Buscar la respuesta en la colección de comentarios
                const reply = await CommentModel.findById(commentId);
                if ((reply === null || reply === void 0 ? void 0 : reply.id_owner) == idUser) {
                    // Si la respuesta pertenece al usuario, actualizarla
                    const updatedUser = await CommentModel.findByIdAndUpdate(commentId, { $set: { comment: comment.comment } }, { new: true });
                    return updatedUser; // Retornar el documento de la respuesta actualizada
                }
                return null; // Retornar null si la respuesta no pertenece al usuario
            }
        }
        catch (error) {
            throw error; // Lanzar error si ocurre alguna excepción
        }
    }
}
export default new CommentService;
