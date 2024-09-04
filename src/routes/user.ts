import express from "express";
import userController from "../controllers/user.controller";
import { auth } from "../middlewares/auth";
import { rol } from "../middlewares/rol";

export const router = express.Router();

// Define la ruta POST para el inicio de sesión.
// No requiere autenticación previa, ya que es el punto donde el usuario se autentica.
router.post("/login", userController.login);

// Define la ruta POST para crear un nuevo usuario.
// Requiere que el usuario esté autenticado (`auth`) y que tenga el rol de 'superadmin' (`rol(['superadmin'])`) para poder crear un nuevo usuario.
router.post("/", auth, rol(['superadmin']), userController.createUser);

// Define la ruta PUT para actualizar un usuario existente, identificado por su ID (`idUser`).
// Requiere autenticación y que el usuario tenga el rol de 'superadmin' para realizar la actualización.
router.put("/:idUser", auth, rol(['superadmin']), userController.update);

// Define la ruta DELETE para eliminar un usuario existente, identificado por su ID (`idUser`).
// Requiere autenticación y que el usuario tenga el rol de 'superadmin' para poder eliminar el usuario.
router.delete("/:idUser", auth, rol(['superadmin']), userController.delete);

// Define la ruta GET para obtener todos los usuarios.
// Solo requiere autenticación previa, sin restricciones de rol.
router.get("/", auth, userController.getAll);
