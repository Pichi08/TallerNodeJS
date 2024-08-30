import bycrypt from "bcrypt";
//import jwt from "jsonwebtoken";

import CommentModel, {CommentDocument, CommentInput} from "../model/comment.model";

class CommentService {

    public async create(userInput: CommentInput): Promise<CommentDocument> {

        try {
            await CommentModel.create(userInput);

            const user = await 


            //const comment = await CommentModel.create(userInput);

            return comment;
        } catch (error) {
            throw error;
        }

    }

    // public async login(userInput: UserInput) {

    //     try {
    //         const userExists: UserDocument | null = await this.findByEmail(userInput.email)
    //         if (!userExists)
    //             throw new ReferenceError("User doesnt exists");

    //         const isMatch: boolean = await bycrypt.compare(userInput.password, userExists.password);
    //         if (!isMatch)
    //             throw new ReferenceError("User of password incorrect");

    //         return {email: userExists.email, id: userExists._id, token: this.generateToker(userExists)};
    //     } catch (error) {
    //         throw error;
    //     }

    // }

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

    // public generateToker(user: UserDocument): string{

    //     try{
    //         return jwt.sign({id: user._id, email: user.email, name:user.name}, process.env.JWT_SECRET || "secret", {expiresIn: "2m"});
    //     }catch(error){
    //         throw error;
    //     }

    // }

    



}

export default new CommentService;
