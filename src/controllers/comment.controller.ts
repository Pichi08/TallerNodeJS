import { Request, Response } from "express";
import { UserDocument} from "../model/user.model"
import { Comment,CommentDocument } from "../model/comment.model";
import commentService from "../services/comment.service"


class commentController {


    public async createComment(req: Request, res: Response){
        try {
            const idUser = req.params.id;
            const comment = req.body as Comment;
            const user: UserDocument = await commentService.createComment(idUser,comment.comment);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async createReply(req: Request, res: Response) {
        try {
            const replier = req.params.id; 
            const { comment, parent } = req.body;

            const replyCreated: CommentDocument = await commentService.createReply(replier, comment,parent);

            res.status(201).json(replyCreated);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async deleteComment(req: Request, res: Response){
        try {
        
            const idUser = req.params.id;
            const idComment = req.params.idComment;
            const user: UserDocument | null | CommentDocument = await commentService.deleteComment(idUser,idComment);
            if(!user){
                res.status(404).json({error: "not found", message: `User with id ${req.params.id} not found`})
            }else{
                res.status(204).json(user);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async updateComment(req: Request, res: Response){
        try {
            const idUser = req.params.id;
            const idComment = req.params.idComment;
            const comment = req.body as Comment;
            const user: UserDocument | null | CommentDocument = await commentService.updateComment(idUser,idComment,comment);
            if(!user){
                res.status(404).json({ message: "Comment not found or does not belong to the user" })
            }else{
                res.status(200).json(user);
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async getAll(req: Request, res: Response){
        try {
            const users: UserDocument[] = await commentService.findAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}

export default new commentController;