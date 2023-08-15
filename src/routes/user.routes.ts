import express from "express";
import { AuthController } from "../controller/userController";

const routerUser = express.Router();
const authController = new AuthController();

routerUser.post("/register", authController.register.bind(authController));
routerUser.post("/login", authController.login.bind(authController));

export default routerUser;
