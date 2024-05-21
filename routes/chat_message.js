import express from "express";
import { ChatMessageController } from "../controllers/chat_message.js";
import { mdAuth } from "../middlewares/authenticated.js";
import multipart from "connect-multiparty";

const api = express.Router();

const mdUpload = multipart({ uploadDir: "./uploads/images" }); 

api.post("/chat/message",[mdAuth.asureAuth],ChatMessageController.sendText);

api.post("/chat/message/image",[mdAuth.asureAuth,mdUpload],ChatMessageController.sendImage);

api.get("/chat/message/:chat_id",[mdAuth.asureAuth],ChatMessageController.getAll);

api.get("/chat/message/total/:chat_id",[mdAuth.asureAuth],ChatMessageController.getTotalMessage);

api.get("/chat/message/last/:chat_id",[mdAuth.asureAuth],ChatMessageController.getLastMessage);


export const chatMessageRoutes = api;
