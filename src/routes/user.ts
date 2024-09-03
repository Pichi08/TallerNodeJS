import express from "express";
import userController from "../controllers/user.controller";
import {auth} from "../middlewares/auth"
import { rol } from "../middlewares/rol"

export const router = express.Router();

router.post("/login", userController.login);
router.post("/",auth,rol(['superadmin']),userController.createUser);
router.put("/:idUser",auth,rol(['superadmin']), userController.update);
router.delete("/:idUser",auth,rol(['superadmin']), userController.delete);
router.get("/",auth, userController.getAll);
