import express from "express";
import commentController from "../controllers/comment.controller"
import {auth} from "../middlewares/auth"

export const router = express.Router();

router.post("/", auth, commentController.create);