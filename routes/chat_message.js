import express from "express";
import { mdAuth } from "../middlewares/authenticated.js";
import multipart from "connect-multiparty";
import { chatController } from "../modules/chat/infrastructure/web/chatController.js";

const api = express.Router();

const mdUpload = multipart({ uploadDir: "./uploads/images" }); 

api.post("/chat/message",[mdAuth.asureAuth],chatController.sendMessageChat);

api.post("/chat/message/image",[mdAuth.asureAuth,mdUpload],chatController.sendImageChat);

api.get("/chat/message/:chat_id",[mdAuth.asureAuth],chatController.getAllMessagesByChatId);

api.get("/chat/message/total/:chat_id",[mdAuth.asureAuth],chatController.getTotalMessages);

api.get("/chat/message/last/:chat_id",[mdAuth.asureAuth],chatController.getLastMessageByChatId);


export const chatMessageRoutes = api;
