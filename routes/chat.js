import express from "express";
import { mdAuth } from "../middlewares/authenticated.js";
import { chatController } from "../modules/chat/infrastructure/web/chatController.js";

const api = express.Router();

api.post("/chat",[mdAuth.asureAuth],chatController.save);

api.delete("/chat/:id",[mdAuth.asureAuth],chatController.deleteChat);

api.get("/chat",[mdAuth.asureAuth],chatController.getAllChatsByUserId);

api.get("/chat/:id",[mdAuth.asureAuth],chatController.getChatById);


export const chatRoutes = api;