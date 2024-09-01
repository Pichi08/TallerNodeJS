import { Request, Response } from "express";
import reactionService from "../services/reaction.service"


class reactionController {


    public async createReaction(req: Request, res: Response){
        try {
            const { commentId, reaction } = req.body;
            const userId = req.params.id;
            /*
            console.log(`id del comentario en User Controler ${commentId}`)
            console.log(`Reaccion en User Controler ${reaction}`)
            console.log(`User Id (el que reacciona) en User Controler ${userId}`)
            console.log(`User Id del dueño del comentario (al que le reaccionan) en User Controler ${req.body.commentOwner}`)
            */


            // Crear la nueva reacción
            const savedReaction = await reactionService.createReaction({ reaction, commentOwner: req.body.commentOwner, comment: commentId}, userId);

            // Asociar la reacción al comentario
            const updatedUser = await reactionService.addReactionToComment(req.body.commentOwner, commentId, savedReaction._id);
            res.status(201).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    
}

export default new reactionController;