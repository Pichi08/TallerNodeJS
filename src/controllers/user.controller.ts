import { Request, Response } from "express";
import { UserDocument, UserInput } from "../model/user.model"
import userService from "../services/user.service"

class userController {

    public async create(req: Request, res: Response){
        try {
            // Si le quiero poner la responsabilidad al controlador de tirar del error hago esto

            // const userExists : UserDocument | null = await userService.findByEmail(req.body.email);
            // if(userExists)
            //     res.status(400).json({message: "User already exists"});
            const user: UserDocument = await userService.create(req.body as UserInput);
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