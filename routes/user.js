import express from "express";
import { mdAuth } from "../middlewares/index.js";
import multipart from "connect-multiparty";
import { userController } from "../modules/user/infrastructure/web/userController.js";

const mdUpload = multipart({uploadDir:"./uploads/avatar"});

const api = express.Router();

api.get("/user/me",[mdAuth.asureAuth],userController.getMe);
api.get("/users",[mdAuth.asureAuth],userController.getAll);
api.get("/user/:id",[mdAuth.asureAuth],userController.findUserById);


export const userRoutes = api;