import express from "express";
import userController from "../controllers/user.controller";
import {auth} from "../middlewares/auth"
import { rol } from "../middlewares/rol"
//import validateSchema from "../middlewares/validSchema";
//import userSchema from "../schemas/user.schemas";
//import loginSchema from "../schemas/user.schemas"
//import auth from "../middlewares/auth";

export const router = express.Router();

//Creacion de rutas
//router.post("/", validateSchema(userSchema), userController.create);
//router.post("/login", validateSchema(loginSchema), userController.login);

router.post("/login", userController.login);
router.post("/",auth,rol(['superadmin']),userController.createUser);
router.put("/:idUser",auth,rol(['superadmin']), userController.update);
router.delete("/:idUser",auth,rol(['superadmin']), userController.delete);
router.get("/",auth, userController.getAll);

//router.get("/profile", auth, userController.getUser)

//router.get("/:id", userController.getUser);

