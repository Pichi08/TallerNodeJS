import express from "express";
import userController from "../controllers/user.controller";
//import validateSchema from "../middlewares/validSchema";
//import userSchema from "../schemas/user.schemas";
//import loginSchema from "../schemas/user.schemas"
//import auth from "../middlewares/auth";

export const router = express.Router();

//Creacion de rutas
//router.post("/", validateSchema(userSchema), userController.create);
//router.post("/login", validateSchema(loginSchema), userController.login);

router.post("/login", userController.login);
router.post("/", userController.create);


router.get("/", userController.getAll);

//router.get("/profile", auth, userController.getUser)

router.get("/:id", userController.getUser);

router.put("/:id", userController.update);

router.delete("/:id", userController.delete);

