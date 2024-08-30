import express from "express";
import commentController from "../controllers/comment.controller"

export const router = express.Router();

router.post("/", commentController.create);