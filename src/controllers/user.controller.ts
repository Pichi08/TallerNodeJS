import { Request, Response } from "express";
import { UserDocument, UserInput} from "../model/user.model"
import userService from "../services/user.service"


class userController {

    public async createUser(req: Request, res: Response){
        try {
            const user: UserDocument = await userService.createUser(req.body as UserInput);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    /*
    public async createComment(req: Request, res: Response){
        try {
            const idUser = req.params.id;
            const comment = req.body as Comment;
            
            console.log(`Comentario en User Controler ${comment.comment}`)
            console.log(`Usuario en User Controler ${idUser}`)
            
            const user: UserDocument = await userService.createComment(idUser,comment.comment);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    */

    /*

    public async createReaction(req: Request, res: Response){
        try {
            const { commentId, reaction } = req.body;
            const userId = req.params.id;
        
            console.log(`id del comentario en User Controler ${commentId}`)
            console.log(`Reaccion en User Controler ${reaction}`)
            console.log(`User Id (el que reacciona) en User Controler ${userId}`)
            console.log(`User Id del dueño del comentario (al que le reaccionan) en User Controler ${req.body.commentOwner}`)


            // Crear la nueva reacción
            const savedReaction = await userService.createReaction({ reaction, commentOwner: req.body.commentOwner, comment: commentId}, userId);

            // Asociar la reacción al comentario
            const updatedUser = await userService.addReactionToComment(req.body.commentOwner, commentId, savedReaction._id);
            res.status(201).json(updatedUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    */
    

    public async login(req: Request, res: Response){
        try {
            const resObj = await userService.login(req.body);
            res.status(200).json(resObj)
        } catch (error) {
            if (error instanceof ReferenceError)
                res.status(401).json({message: "Not authorized"}
            )
            res.status(500).json()
        }
    }


    public async getUser(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.findById(req.params.id);
            if (!user)
                res.status(404).json({error: "not found", message: "User with id ${req.params.id} not found"});
            res.json(user);            
        } catch (error) {
            res.status(500).json(error)
        }        
    }

    public async getAll(req: Request, res: Response){
        try {
            const users: UserDocument[] = await userService.findAll();
            return res.json(users);
        } catch (error) {
            return error;
        }
    }

    public async update(req: Request, res: Response){

        res.send(`update id ${req.params.id}`)
    }

    public async delete(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.delete(req.params.id);
            if (!user)
                res.status(404).json({error: "not found", message: "User with id ${req.params.id} not found"});
            res.json(user);            
        } catch (error) {
            res.status(500).json(error)
        }   
    }
    
}

export default new userController;