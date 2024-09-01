import { Request, Response } from "express";
import { UserDocument, UserInput} from "../model/user.model"
import { Comment } from "../model/comment.model";
import commentService from "../services/comment.service"


class commentController {


    public async createComment(req: Request, res: Response){
        try {
            const idUser = req.params.id;
            const comment = req.body as Comment;
            /*
            console.log(`Comentario en User Controler ${comment.comment}`)
            console.log(`Usuario en User Controler ${idUser}`)
            */
            const user: UserDocument = await commentService.createComment(idUser,comment.comment);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response){
        try {
            const users: UserDocument[] = await commentService.findAll();
            return res.json(users);
        } catch (error) {
            return error;
        }
    }
    
}

export default new commentController;