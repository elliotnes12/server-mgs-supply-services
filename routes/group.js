import express from "express";
import { groupController } from "../controllers/index.js";
import { mdAuth } from "../middlewares/authenticated.js";
import multipart from "connect-multiparty";

const api = express.Router();

const mdUpload = multipart({ uploadDir: "./uploads/group" }); 

api.post("/group",[mdAuth.asureAuth,mdUpload],groupController.create);



export const chatGroupRoutes = api;