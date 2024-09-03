import express from "express";
import reactionController from "../controllers/reactions.controller";
import {auth} from "../middlewares/auth"

export const router = express.Router();


router.post("/",auth, reactionController.createReaction)
router.delete("/",auth,reactionController.deleteReaction)

