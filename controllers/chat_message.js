import { ChatMessage } from "../models/index.js";
import { ETQ_LOG } from "../utils/constants.js";
import {io, getFilePath } from "../utils/index.js";

async function sendText(req, resp) {
    const { chat_id, message } = req.body;
    const { user_id } = req.user;

    try {
        const chat_message = new ChatMessage({
            chat: chat_id,
            user: user_id,
            message: message,
            type: "TEXT"
        });

        await chat_message.save();


        const data = await ChatMessage.findById(chat_message._id).populate("user");

        io.sockets.in(chat_id).emit("message",data);
        io.sockets.in(`${chat_id}_notify`).emit("message_notify",data);
    
        resp.status(201).send(data);
    } catch (error) {
        resp.status(500).send({ module: "CHAT_MESSAGE", msg: "Error function send", error: error.message });
    }
}

async function sendImage(req,resp){
    const { chat_id } = req.body;
    const { user_id } = req.user;

    
    try {
        const chat_message = new ChatMessage({
            chat_id: chat_id,
            user_id: user_id,
            message: getFilePath(req.files.image),
            type: "IMAGE"
        });
    

        await chat_message.save();


        const data = await ChatMessage.findById(chat_message._id).populate("user");

        io.sockets.in(chat_id).emit("message",data);
        io.sockets.in(`${chat_id}_notify`).emit("message_notify",data);
    
        resp.status(201).send(data);
    } catch (error) {
        resp.status(500).send({ module: "CHAT_MESSAGE", msg: "Error function send", error: error.message });
    }


}


async function getAll(req,resp){

    const {chat_id} = req.params;
 
    try{

      console.log(ETQ_LOG,"getAll",chat_id);
      const messages = await  ChatMessage.find({chat:chat_id}).sort({createdAt: 1})
      .populate("user","-password");

      const total = await ChatMessage.countDocuments({ chat: chat_id });

      resp.status(200).send({messages:messages, total: total});
    }catch(e){
      resp.status(400).send({module:"CHAT_MESSAGE",msg:"chat not found"});
    }

}

async function getTotalMessage(req, resp) {
    const { chat_id } = req.params;

    try {
        console.log(ETQ_LOG, "getTotalMessage", chat_id);
        const total = await ChatMessage.countDocuments({ chat: chat_id });

        resp.status(200).send({ total: total });
    } catch (e) {
        resp.status(400).send({ module: "CHAT_MESSAGE", msg: "chat not found" });
    }
}

async function getLastMessage(req,resp){

    const { chat_id } = req.params;

    try {
        console.log(ETQ_LOG, "getLastMessage", chat_id);
        const message = await ChatMessage.findOne({ chat: chat_id }).sort({createdAt:-1});

        resp.status(200).send(message);
    } catch (e) {
        resp.status(400).send({ module: "CHAT_MESSAGE", msg: "chat not found" });
    }

}

export const ChatMessageController = {
    sendText,
    sendImage,
    getAll,
    getTotalMessage,
    getLastMessage
}
