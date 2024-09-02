import UserModel, {UserDocument, UserInput} from "../model/user.model";
import ReactionModel, {ReactionDocument,ReactionInput}  from "../model/reaction.model"
class ReactionService {


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
        /*
        console.log(`Id del que reacciona en User Service ${userId}`)
        console.log(`Id del comentario al que se reacciono en User Service ${commentId}`)
        console.log(`Id de la reaccion  en User Service ${reactionId}`)
        */
    
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


}

export default new ReactionService;
