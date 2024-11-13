import { UserDocument, UserInput, LoginInput } from "../../model/user.model";
import { CommentDocument, Comment } from "../../model/comment.model";
import userService from "../../services/user.service";
import commentService from "../../services/comment.service";

export const resolvers = {
    Query: {
        user: async (_root: any, params: any) => {
            console.log(params.id);
            const user: UserDocument | null = await userService.findById(params.id);
            return user;
        }, 
        users: (_root: any) => userService.findAll(),
        userSearchByEmail: async (_root: any, params: any) => {
            const user: UserDocument | null = await userService.findByEmail(params.email);
            return user;
        },
        comments: async (_root: any) => commentService.findAll(),

    },
    Mutation: {
        createUser: async (_root: any, params: any )=> {
            const userOutput: UserDocument = await userService.createUser(params.input as UserInput);
            return userOutput;
        },
        updateUser: async (_root: any, params: any) => {
            const userOutput: UserDocument | null = await userService.update(params.input.id, params.input as UserInput);
            return userOutput;
        },
        deleteUser: async (_root: any, params: any) => {
            const userOutput: UserDocument | null = await userService.delete(params.input.id);
            return userOutput;
        },
        loginUser: async (_root: any, params: any) => {
            const userOutput = await userService.login(params.input as LoginInput);
            return userOutput;
        },
        createComment: async (_root:any, params: any) => {
            const commentOutput: UserDocument | null = await commentService.createComment(params.input.user, params.input.comment);
            return commentOutput.comments;
        }

    }





}