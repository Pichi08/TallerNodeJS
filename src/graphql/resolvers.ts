import { UserDocument, UserInput, LoginInput } from "../model/user.model.js";
import { CommentDocument, Comment } from "../model/comment.model.js";
import userService from "../services/user.service.js";
import commentService from "../services/comment.service.js";
import reactionService from "../services/reaction.service.js";
import { GraphQLError } from "graphql";


const checkRole = (requiredRoles: string[], role: string) => {
    if (!requiredRoles.includes(role)) {
        throw unauthorizedError("You do not have the necessary permissions.");
    }
};

export const resolvers = {
    Query: {

        user: async (_root: any, params: any, context:any) => {
            checkRole(["admin"], context.user.rol);
            const user: UserDocument | null = await userService.findById(params.id);
            if(!user){
                throw notFoundError(`User with id ${params.id} not found`)
            }
            return user;
        }, 
        users: (_root: any,params:any,context:any) => {
            return userService.findAll()
        },
        userSearchByEmail: async (_root: any, params: any, context:any ) => {
            checkRole(["admin"], context.user.rol);
            const user: UserDocument | null = await userService.findByEmail(params.email);
            if(!user){
                throw notFoundError(`User with email ${params.email} not found`)
            }
            return user;
        },
        comments: async (_root: any) => {
            const users: UserDocument[] = await commentService.findAll();
            console.log(users);
            return users;
        },
        findCommentById: async (_root: any, params: any) => {
            const comment: CommentDocument | null = await commentService.findByCommentId(params.commentId);
            if(!comment){
                throw notFoundError(`Comment with id ${params.commentId} not found`)
            }
            console.log(comment);
            return await comment;
        }

    },
    Mutation: {
        createUser: async (_root: any, params: any, context: any )=> {
            checkRole(["admin"], context.user.rol);
            const userOutput: UserDocument = await userService.createUser(params.input as UserInput);
            return userOutput;
        },
        updateUser: async (_root: any, params: any, context: any) => {
            checkRole(["admin"], context.user.rol);
            const user = await userService.findById(context.user.id);
            if(!user){
                throw notFoundError(`User with id ${context.user.id} not found`)
            }
            const userOutput: UserDocument | null = await userService.update(context.user.id, params.input as UserInput);
            return userOutput;
        },
        deleteUser: async (_root: any, params: any, context:any) => {
            checkRole(["admin"], context.user.rol);
            const userOutput: UserDocument | null = await userService.delete(params.input.id);
            if(!userOutput){
                throw notFoundError(`User with id ${params.input.id} not found`)
            }
            return userOutput;
        },
        loginUser: async (_root: any, params: any) => {
            const userOutput = await userService.login(params.input as LoginInput);
            if(!userOutput){
                throw unauthorizedError("User not found")
            }
            return userOutput;
        },
        createComment: async (_root:any, params: any, context:any) => {
            const commentOutput: UserDocument | null = await commentService.createComment(context.user.id, params.input.comment);
            return commentOutput.comments;
        },
        updateComment: async (_root: any, params: any, context: any) => {
            const comment = params.input.comment as Comment;
            const commentOutput: UserDocument | null | CommentDocument = await commentService.updateComment(context.user.id, params.input.idComment, comment);
            if(!commentOutput){
                throw forbiddenError('You do not have permission to update this comment');
            }
            return commentOutput.comments;
        },
        deleteComment: async (_root: any, params: any, context: any) => {
            const commentOutput: UserDocument | CommentDocument | null = await commentService.deleteComment(context.user.id, params.input.idComment);
            if(!commentOutput){
                throw forbiddenError('You do not have permission to delete this comment');
            }
            return commentOutput.comments;
        },
        answerComment: async (_root: any, params: any, context:any) => {
            const commentOutput: UserDocument | CommentDocument | null = await commentService.createReply(context.user.id, params.input.comment, params.input.parent);
            if (!commentOutput.parent){
                throw notFoundError('Parent comment not found');
            }
            const comment: UserDocument | CommentDocument | null = await commentService.findByCommentId(commentOutput.parent.toString());
            // console.log("Padre: ",comment);
            if(!commentOutput){
                throw notFoundError('Parent comment not found');
            }
            return comment;
        },
        createReaction: async (_root: any, params: any, context: any) => {
            const reactionOutput: UserDocument | CommentDocument | null = await reactionService.createReaction(params.input.reaction, params.input.commentId, context.user.id);
            if(!reactionOutput){
                throw notFoundError('Comment not found');
            }
            const comment: UserDocument | CommentDocument | null = await commentService.findByCommentId(reactionOutput._id.toString());
            console.log(comment);
            
            // console.log(reactionOutput);
            return comment;
        },
        deleteReaction: async (_root: any, params: any,context: any) => {
            const reactionOutput = await reactionService.deleteReaction(params.input.reactionId, context.user.id, params.input.commentParentId);
            if(!reactionOutput){
                throw notFoundError('Reaction not found');
            }
            const comment: UserDocument | CommentDocument | null = await commentService.findByCommentId(params.input.commentParentId);
            
            return comment;
        }

    }
}

function notFoundError(message: string) {
    return new GraphQLError(message, {
      extensions: { code: 'NOT_FOUND' },
    });
  }
  
function unauthorizedError(message: string) {
    return new GraphQLError(message, {
      extensions: { code: 'UNAUTHORIZED' },
    });
  }

function forbiddenError(message: string) {
    return new GraphQLError(message, {
      extensions: { code: 'INTERNAL_SERVER_ERROR' },
    });
  }