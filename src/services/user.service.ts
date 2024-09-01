import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel, {UserDocument, UserInput} from "../model/user.model";


class UserService {

    public async createUser(userInput: UserInput): Promise<UserDocument> {

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
    
    /*

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
        */

    /*

    public async createReaction(reactionInput: ReactionInput, userId: string) {
        //let reaction = reactionInput.reaction;
        const newReaction = new ReactionModel({
            reaction: reactionInput.reaction,
            owner: userId,
            commentOwner: reactionInput.commentOwner,
            comment: reactionInput.comment
        });

        const savedReaction = await newReaction.save();
        return savedReaction;
    }

    public async addReactionToComment(userId: string, commentId: string, reactionId: unknown) {
        
        console.log(`Id del que reacciona en User Service ${userId}`)
        console.log(`Id del comentario al que se reacciono en User Service ${commentId}`)
        console.log(`Id de la reaccion  en User Service ${reactionId}`)
        
    
        try {
            const user = await UserModel.findOneAndUpdate(
                { _id: userId, 'comments._id': commentId },
                { $push: { 'comments.$.reactions': reactionId } }, // Agrega la reacción al array de reacciones del comentario específico
                { new: true } // Retorna el documento actualizado
            )
    
            console.log('Usuario después de agregar la reacción:', user);
            return user;
        } catch (error) {
            console.error("Error al agregar la reacción:", error);
            throw error;
        }
    }
        */
    
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
