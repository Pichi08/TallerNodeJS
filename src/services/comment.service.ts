import UserModel, {UserDocument} from "../model/user.model";
import CommentModel, {Comment, CommentDocument,Reply } from "../model/comment.model";
import { v4 as uuidv4 } from 'uuid';
import mongoose, { Types } from "mongoose";
import { error } from "console";

class CommentService {
    
    public async createComment(idUser: string, comment: string): Promise<UserDocument> {
        try {
            const user = await UserModel.findById(idUser);
    
            
            if (!user) {
                throw new Error("User not found");
            }


    
            
            //const commentId = uuidv4();
    
            const newComment = {comment: comment};
            
            console.log(`Comentario en User Service ${comment}`)
            //console.log(`Id en User Service ${newComment.idComment}`)
            
    
            user.comments.push(newComment);
    
            await user.save();
    
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async createReply(idUser: string, comment: string, parent: string): Promise<CommentDocument>{
        const user = await UserModel.findById(idUser);
        if (!user) {
            throw new Error("User not found");
        }

        const newReply = new CommentModel({
            //idComment: new Types.ObjectId().toString(),
            comment: comment,
            id_owner: idUser,
            parent: parent
        });
        
        const savedReply = await newReply.save();
        return savedReply;
    }



    public async addReplyToComment(userId: string, replyContent: string, parentCommentId: string) {
        try {
            // Crear la respuesta como un nuevo comentario
            console.log(`UserId en Service ${userId}`);
            console.log(`reply en Controller ${replyContent}`);
            console.log(`idComment en Controller ${parentCommentId}`);
            const reply = await CommentModel.create({
                idComment: new Types.ObjectId().toString(),
                comment: replyContent,
                reactions: [],
                replies: []
            });
    
            const comment = await UserModel.findOne(
                { _id: userId, 'comments.idComment': parentCommentId }
            );
            console.log('Comentario encontrado:', comment);
            // Agregar el ObjectId de la respuesta al array de 'replies' del comentario padre
            const user = await UserModel.findOneAndUpdate(
                { _id: userId, 'comments._id': parentCommentId },
                { $push: { 'comments.$.replies': reply._id } },
                { new: true }
            );
    
            console.log('Usuario después de agregar la respuesta:', user);
            return user;
        } catch (error) {
            console.error("Error al agregar la respuesta:", error);
            throw error;
        }
    }


public async findAll(): Promise<UserDocument[]> {
    try {
        const users = await UserModel.find()
            .populate({
                path: 'comments',
                populate: [
                    {
                        path: 'reactions', 
                        populate: {
                            path: 'owner',
                            select: 'name'
                        }
                    },
                    {
                        path: 'replies', // Agrega aquí el campo 'replies'
                        populate: [
                            {
                                path: 'reactions', 
                                populate: {
                                    path: 'owner',
                                    select: 'name'
                                }
                            },
                            {
                                path: 'replies', // Si las respuestas también pueden tener respuestas anidadas
                                populate: {
                                    path: 'reactions',
                                    populate: {
                                        path: 'owner',
                                        select: 'name'
                                    }
                                }
                            }
                        ]
                    }
                ]
            });

        return users;
    } catch (error) {
        console.error("Error al obtener usuarios y comentarios:", error);
        throw error;
    }
}


    

    public async deleteComment(idUser: string, commentId: string): Promise<UserDocument | null> {
        try {            
            const commentOwner = await UserModel.findOne(
                { 'comments._id': commentId }
            )
                        
            if(commentOwner?._id == idUser){
                const deleteResult: UserDocument | null = await UserModel.findOneAndUpdate(
                    { _id: new mongoose.Types.ObjectId(idUser) },
                    { $pull: { comments: { _id: new mongoose.Types.ObjectId(commentId) } } },
                    { new: true } // Devuelve el documento actualizado
                  ); 
                  
                    return deleteResult;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    public async updateComment(idUser: string, commentId: string, comment: Comment): Promise<UserDocument | null> {
        try {
            const commentOwner = await UserModel.findOne(
                { 'comments._id': commentId }
            )
            const user = await UserModel.findById(idUser);
            
            if (!user) {
                throw new Error("User not found");
            }

            if(commentOwner?._id == idUser){
                const updatedUser = await UserModel.findOneAndUpdate(
                    {
                        _id: idUser,
                        'comments._id': commentId
                    },
                    {
                        $set: { 'comments.$.comment': comment.comment } // Actualiza el texto del comentario
                    },
                    {
                        new: true // Devuelve el documento actualizado
                    }
                );
                  
                    return updatedUser;
            }else{
                return null;
            }
        } catch (error) {
            throw error;
        }
    }

    public async getAll(): Promise<UserDocument[]> {
        try {
            const users = await UserModel.find()
                .populate({
                    path: 'comments',
                    populate: [
                        {
                            path: 'replies',
                            populate: { path: 'reactions' }  // Si las respuestas también tienen reacciones
                        },
                        {
                            path: 'reactions'  // Para popular directamente las reacciones del comentario
                        }
                    ]
                });
            return users;
        } catch (error) {
            throw error;
        }
    }
    
    
    
}

export default new CommentService;
