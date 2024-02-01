import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const router = Router();

router.get("/isAlive", AuthController.isAlive);

router.post("/register", AuthController.registerNewUser);

router.post("/login", AuthController.login);

// router.post("/logout")

export default router;
