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

    public async getAll(req: Request, res: Response){
        try {
            const users: UserDocument[] = await userService.findAll();
            return res.json(users);
        } catch (error) {
            return error;
        }
    }

    public async update(req: Request, res: Response){
        try {
            const user: UserDocument | null = await userService.update(req.params.idUser, req.body as UserInput);
            if (!user){
                res.status(404).json({message: `User with id:${req.params.id} not found`})
            }            
            res.json(user);            
        } catch (error) {
            res.status(500).json(error);
        }    }

    public async delete(req: Request, res: Response) {
        try {
            const user: UserDocument | null = await userService.delete(req.params.idUser);
            if (!user)
                res.status(404).json({error: "not found", message: "User with id ${req.params.id} not found"});
            res.json(user);            
        } catch (error) {
            res.status(500).json(error)
        }   
    }
    
}

export default new userController;