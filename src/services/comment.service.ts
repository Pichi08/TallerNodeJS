import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

import CommentModel, {CommentDocument, CommentInput} from "../model/comment.model";
import userService from "./user.service";

class CommentService {

    public async create(userInput: CommentInput, userId: string){

        try {
            
            const user: any | null = await userService.addComment(userId, userInput);
            return user;
        } catch (error) {
            throw error;
        }

    }

    // public async findByEmail(email: string): Promise<UserDocument | null> {

    //     try {
    //         const user = await UserModel.findOne({email});
    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }

    // }

    // public async findById(id: string): Promise<UserDocument | null>{
    //     try {
    //         const user: UserDocument|null = await UserModel.findById(id);
    //         return user;            
    //     } catch (error) {
    //         throw error;
    //     }
    // }


    // public async findAll(): Promise<UserDocument[]> {

    //     try {
    //         const user = await UserModel.find();
    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }

    // }

    // public async update(id: string, userInput: UserInput): Promise<UserDocument | null> {
    //     try {
    //         const user: UserDocument | null = await UserModel.findOneAndUpdate({_id: id}, userInput, {returnOriginal: false});
    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // public async delete(id: string): Promise<UserDocument | null>{
    //     try {
    //         const user : UserDocument|null = await UserModel.findByIdAndDelete(id);
    //         return user;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}

export default new CommentService;
