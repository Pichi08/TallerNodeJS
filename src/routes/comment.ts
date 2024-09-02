import express from "express";
import commentController from "../controllers/comment.controller";
import {auth} from "../middlewares/auth"
export const router = express.Router();

router.post("/",auth, commentController.createComment);
router.post("/reply",auth, commentController.createReply);
router.delete("/:idComment",auth, commentController.deleteComment);
router.put("/:idComment",auth, commentController.updateComment);
router.get("/", auth,commentController.getAll);



