import express from "express";
import { authController } from "../modules/auth/infrastructure/web/controllers/authController.js";
const api = express.Router();

api.post("/auth/register",authController.registerUser);

api.post("/auth/login",authController.login);

api.post("/auth/refresh_access_token",authController.refreshToken);


/*



api.post("/auth/validate_email_code",AuthController.validateEmailCode);

*/

export const authRoutes = api;
