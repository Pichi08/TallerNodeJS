import {Request, Response, NextFunction} from "express";

export const rol = (roles: string[]) => {
    return(req: Request, res: Response, next: NextFunction) => {
        const loggedUser = req.body.loggedUser;

        if(!loggedUser || !roles.includes(loggedUser.rol)){
            return res.status(401).json({message: "Access Denied"});
        }
        next();
    };
};
