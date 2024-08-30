import {Request, Response, NextFunction} from "express";
import jwt, {TokenExpiredError} from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    let token = req.header("Authorization");
    token = token?.replace("Bearer ", "");
    if(!token) {
        return res.status(401).json({message: "Unautharized"});
    }
    try {
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");
        req.body.loggedUser = decoded;
        req.params.id = decoded.id;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError){
            return res.status(401).json({messsage: "Token expired"});
        }
        res.status(401).json({message: "Unauthorized 2.0"})
    }
}

