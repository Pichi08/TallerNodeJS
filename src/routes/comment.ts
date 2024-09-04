import express from "express";
import commentController from "../controllers/comment.controller";
import { auth } from "../middlewares/auth";
export const router = express.Router();

// Define la ruta POST para crear un nuevo comentario.
// El middleware de autenticación (auth) se ejecuta antes de llamar al método createComment del controlador de comentarios.
// Si el usuario está autenticado, se permite la creación del comentario.
router.post("/", auth, commentController.createComment);

// Define la ruta POST para crear una respuesta a un comentario existente.
// El middleware de autenticación (auth) se ejecuta primero para verificar que el usuario esté autenticado.
router.post("/reply", auth, commentController.createReply);

// Define la ruta DELETE para eliminar un comentario específico identificado por su ID (idComment).
// El middleware de autenticación (auth) se asegura de que solo los usuarios autenticados puedan eliminar comentarios.
router.delete("/:idComment", auth, commentController.deleteComment);

// Define la ruta PUT para actualizar un comentario específico identificado por su ID (idComment).
// El middleware de autenticación (auth) verifica que el usuario esté autenticado antes de permitir la actualización.
router.put("/:idComment", auth, commentController.updateComment);

// Define la ruta GET para obtener todos los comentarios.
// Solo los usuarios autenticados pueden acceder a esta ruta, ya que se aplica el middleware de autenticación (auth).
router.get("/", auth, commentController.getAll);
