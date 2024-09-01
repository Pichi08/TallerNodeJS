import UserModel, {UserDocument} from "../model/user.model";
import { v4 as uuidv4 } from 'uuid';

class CommentService {
    
    public async createComment(idUser: string, comment: string): Promise<UserDocument> {
        try {
            const user = await UserModel.findById(idUser);
    
            
            if (!user) {
                throw new Error("User not found");
            }
    
            const commentId = uuidv4();
    
            const newComment = { idComment: commentId, comment: comment };
            console.log(`Comentario en User Service ${comment}`)
            console.log(`Id en User Service ${newComment.idComment}`)
            
    
            user.comments.push(newComment);
    
            await user.save();
    
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async findAll(): Promise<UserDocument[]> {
        try {
            const users = await UserModel.find()
                .populate({
                    path: 'comments',
                    populate: {
                        path: 'reactions', 
                        populate: {
                            path: 'owner',
                            select: 'name' 
                        }
                    }
                });

            return users;
        } catch (error) {
            console.error("Error al obtener usuarios y comentarios:", error);
            throw error;
        }
    }

    /*
    public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
        try {
            const user: UserDocument | null = await UserModel.findOneAndUpdate({_id: id}, userInput, {returnOriginal: false});
            return user;
        } catch (error) {
            throw error;
        }
    }

    public async delete(id: string): Promise<UserDocument | null>{
        try {
            const user : UserDocument|null = await UserModel.findByIdAndDelete(id);
            return user;
        } catch (error) {
            throw error;
        }
    }
    */
    
    
}

export default new CommentService;
