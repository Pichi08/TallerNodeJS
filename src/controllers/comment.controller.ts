import { Request, Response } from "express";
import { CommentDocument, CommentInput } from "../model/comment.model"
import commentService from "../services/comment.service"

class commentController {

    public async create(req: Request, res: Response){
        try {
            const user: CommentDocument = await commentService.create(req.body as CommentInput);
            res.status(201).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    // public async login(req: Request, res: Response){
    //     try {
    //         const resObj = await userService.login(req.body);
    //         res.status(200).json(resObj)
    //     } catch (error) {
    //         if (error instanceof ReferenceError)
    //             res.status(401).json({message: "Not authorized"}
    //         )
    //         res.status(500).json()
    //     }
    // }


    // public async getUser(req: Request, res: Response) {
    //     try {
    //         const user: UserDocument | null = await userService.findById(req.params.id);
    //         if (!user)
    //             res.status(404).json({error: "not found", message: "User with id ${req.params.id} not found"});
    //         res.json(user);            
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }        
    // }

    // public async getAll(req: Request, res: Response){
    //     try {
    //         const users: UserDocument[] = await userService.findAll();
    //         return res.json(users);
    //     } catch (error) {
    //         return error;
    //     }
    // }

    // public async update(req: Request, res: Response){

    //     res.send(`update id ${req.params.id}`)
    // }

    // public async delete(req: Request, res: Response) {
    //     try {
    //         const user: UserDocument | null = await userService.delete(req.params.id);
    //         if (!user)
    //             res.status(404).json({error: "not found", message: "User with id ${req.params.id} not found"});
    //         res.json(user);            
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }   
    // }
    
}

export default new commentController;