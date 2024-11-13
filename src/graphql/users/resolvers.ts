import { UserDocument, UserInput } from "../../model/user.model";
import userService from "../../services/user.service";

export const resolvers = {
    Query: {
        user: async (_root: any, params: any) => {
            console.log(params.id);
            const user: UserDocument | null = await userService.findById(params.id);
            return user;
        }, 
        users: (_root: any) => userService.findAll(),

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
        }
    
    }





}