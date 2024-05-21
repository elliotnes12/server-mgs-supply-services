import express from "express";
import { ChatController } from "../controllers/chat.js";
import { mdAuth } from "../middlewares/authenticated.js";

const api = express.Router();

api.post("/chat",[mdAuth.asureAuth],ChatController.createChat);

api.get("/chat",[mdAuth.asureAuth],ChatController.getAll);

api.delete("/chat/:id",[mdAuth.asureAuth],ChatController.deleteChat);

api.get("/chat/:id",[mdAuth.asureAuth],ChatController.getChat);


export const chatRoutes = api;