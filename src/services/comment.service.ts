import UserModel, {UserDocument} from "../model/user.model";
import CommentModel, {Comment, CommentDocument} from "../model/comment.model";
import mongoose from "mongoose";
class CommentService {
    
    public async createComment(idUser: string, comment: string): Promise<UserDocument> {
        try {
            const user = await UserModel.findById(idUser);
    
            if (!user) {
                throw new Error("User not found");
            }
    
            const newComment = {comment: comment};
                        
            user.comments.push(newComment);
    
            await user.save()
    
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

        const parentObjectId = new mongoose.Types.ObjectId(parent);

        const newReply = new CommentModel({
            comment: comment,
            id_owner: idUser,
            parent: parentObjectId
        });
        
        const savedReply = await newReply.save();
        return savedReply;
    }


    public async findAll(): Promise<UserDocument[]> {
        try {
            const users = await UserModel.aggregate([
                { $unwind: '$comments' },
                {
                  $lookup: {
                    from: 'replies',
                    localField: 'comments._id',
                    foreignField: 'parent',
                    as: 'comments.replies'
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
                    as: 'comments.replies.nested_replies'
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
                    replies: { $push: '$comments.replies' }
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
                        else: '$replies'
                      }
                    }
                  }
                }
              ], { maxTimeMS: 60000, allowDiskUse: true });
              

            return users; 
        } catch (error) {
            console.error("Error while fetching users and their comments:", error);
            throw error;
        }
    }

  

    public async deleteComment(idUser: string, commentId: string): Promise<UserDocument | null | CommentDocument> {
        try {
            const commentOwner = await UserModel.findOne({ 'comments._id': commentId });
            
            if (commentOwner?._id == idUser) {
                const updatedUser: UserDocument | null = await UserModel.findOneAndUpdate(
                    { _id: new mongoose.Types.ObjectId(idUser), 'comments._id': commentId },
                    { $set: { 'comments.$.comment': "comentario no disponible" } },
                    { new: true } 
                ); 
    
                return updatedUser;
            } else {
                const reply = await CommentModel.findById(commentId);
                if(reply?.id_owner == idUser){
                    const updatedUser: CommentDocument | null = await CommentModel.findByIdAndUpdate(
                        commentId,
                        { $set: { comment: "comentario no disponible" } },
                        { new: true } 
                    );
                    
                    return updatedUser;
                }
                return null;              
            }
        } catch (error) {
            throw error;
        }
    }
    
    

    public async updateComment(idUser: string, commentId: string, comment: Comment): Promise<UserDocument | null | CommentDocument> {
        try {
            const commentOwner = await UserModel.findOne(
                { 'comments._id': commentId }
            )

            const user = await UserModel.findById(idUser);
            
            if (!user) {
                throw new Error("User not found");
            }

            if(commentOwner){
                if(commentOwner?._id == idUser){
                    const updatedUser = await UserModel.findOneAndUpdate(
                        {
                            _id: idUser,
                            'comments._id': commentId
                        },
                        {
                            $set: { 'comments.$.comment': comment.comment }
                        },
                        {
                            new: true 
                        }
                    );
                      
                        return updatedUser;
                }else{
                    return null;
                }
            }else{
                const reply = await CommentModel.findById(commentId);
                if(reply?.id_owner == idUser){
                    const updatedUser: CommentDocument | null = await CommentModel.findByIdAndUpdate(
                        commentId,
                        { $set: { comment: comment.comment } },
                        { new: true } 
                    );
                    
                    return updatedUser;
                }
                return null;
            }

        
        } catch (error) {
            throw error;
        }
    }
     
}

export default new CommentService;
