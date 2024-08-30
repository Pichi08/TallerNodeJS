import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel, {UserDocument, UserInput} from "../model/user.model";
import { CommentInput } from "../model/comment.model";
import mongoose from "mongoose";

class UserService {

    public async create(userInput: UserInput): Promise<UserDocument> {

        try {
            const userExists: UserDocument | null = await this.findByEmail(userInput.email)
            if (userExists)
                throw new ReferenceError("User already exists");
            userInput.password = await bycrypt.hash(userInput.password, 10);
            const user = await UserModel.create(userInput);
            return user;
        } catch (error) {
            throw error;
        }

    }

    public async addComment(userId: string, comment: CommentInput): Promise<UserDocument | null> {

        try{
            console.log(`comentario ${comment.comment}`)
            
            console.log(`${mongoose.isValidObjectId(userId)}`);
            const user: UserDocument | null = await UserModel.findByIdAndUpdate(userId, {$push: {comments: comment.comment}});
            return user;

        } catch (error) {
            throw error;
        }

    }

    public async login(userInput: UserInput) {

        try {
            const userExists: UserDocument | null = await this.findByEmail(userInput.email)
            if (!userExists)
                throw new ReferenceError("User doesnt exists");

            const isMatch: boolean = await bycrypt.compare(userInput.password, userExists.password);
            if (!isMatch)
                throw new ReferenceError("User of password incorrect");

            return {email: userExists.email, id: userExists._id, token: this.generateToker(userExists)};
        } catch (error) {
            throw error;
        }

    }

    public async findByEmail(email: string): Promise<UserDocument | null> {

        try {
            const user = await UserModel.findOne({email});
            return user;
        } catch (error) {
            throw error;
        }

    }

    public async findById(id: string): Promise<UserDocument | null>{
        try {
            const user: UserDocument|null = await UserModel.findById(id);
            return user;            
        } catch (error) {
            throw error;
        }
    }


    public async findAll(): Promise<UserDocument[]> {

        try {
            const user = await UserModel.find();
            return user;
        } catch (error) {
            throw error;
        }

    }

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

    public generateToker(user: UserDocument): string{

        try{
            return jwt.sign({id: user._id, email: user.email, name:user.name}, process.env.JWT_SECRET || "secret", {expiresIn: "100m"});
        }catch(error){
            throw error;
        }

    }

    



}

export default new UserService;
