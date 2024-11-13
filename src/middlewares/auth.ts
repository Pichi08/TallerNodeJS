import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Definición del middleware de autenticación.
export const auth = (req: Request, res: Response, next: NextFunction) => {
    // Obtención del token desde el encabezado "Authorization" de la solicitud.
    let token = req.header("Authorization");
    // Elimina el prefijo "Bearer " del token si está presente.
    token = token?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        // Verifica el token usando la clave secreta
        // Si el token es válido, decodifica su contenido.
        const decoded: any = jwt.verify(token, process.env.JWT_SECRET || "secret");

        // Guarda la información del usuario decodificado en req.body.loggedUser para que esté disponible más adelante.
        req.body.loggedUser = decoded;
        // Almacena el ID del usuario en req.params.id, para facilitar el acceso en otros lugares.
        req.params.id = decoded.id;

        // Llama a la siguiente función si la verificación fue exitosa.
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({ message: "Token expired" });
        }
        res.status(401).json({ message: "Unauthorized" });
    }
};
