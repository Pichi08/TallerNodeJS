import express from "express";
import reactionController from "../controllers/reactions.controller";
import { auth } from "../middlewares/auth";

export const router = express.Router();

// Define la ruta POST para crear una nueva reacción.
// El middleware de autenticación (auth) se ejecuta antes de llamar al método createReaction del controlador de reacciones.
// Si el usuario está autenticado, se permite la creación de la reacción.
router.post("/", auth, reactionController.createReaction);

// Define la ruta DELETE para eliminar una reacción.
// El middleware de autenticación (auth) verifica que el usuario esté autenticado antes de permitir la eliminación de la reacción.
router.delete("/", auth, reactionController.deleteReaction);
