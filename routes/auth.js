import express from "express";
import { authController } from "../modules/auth/infrastructure/web/controllers/authController.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

api.post("/auth/generate_code", authController.generateCode);

api.post("/auth/register",authController.registerUser);

api.post("/auth/login",authController.login);

api.post("/auth/refresh_access_token",authController.refreshToken);

api.post("/auth/validate_code", authController.activateUser);


export const authRoutes = api;
