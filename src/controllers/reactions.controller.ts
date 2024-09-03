import { Request, Response } from "express";
import reactionService from "../services/reaction.service"

class reactionController {


    public async createReaction(req: Request, res: Response){
        try {

            
            const { reaction, commentId } = req.body;
            const userId = req.params.id;
            const savedReaction = await reactionService.createReaction(reaction,commentId, userId);
            res.status(201).json(savedReaction);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async deleteReaction(req: Request, res: Response){
        try{
            const {reactionId, commentId} = req.body;
            const userId = req.params.id;
            const deletedReaction = await reactionService.deleteReaction(reactionId, userId,commentId);
            if(deletedReaction.success){
                res.status(204).json({message: deletedReaction.message});
            }else{
                res.status(404).json({message: deletedReaction.message});
            }
        }catch(error){
            res.status(500).json(error);
        }
    }

    
}

export default new reactionController;