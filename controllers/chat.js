import { Chat, ChatMessage } from "../models/index.js";
import { ETQ_LOG } from "../utils/constants.js";


async function createChat(req, resp) {
    const { participant_id_one, participant_id_two } = req.body;

    const findOne = await Chat.findOne({
        participant_one: participant_id_one,
        participant_two: participant_id_two
    });

    const findTwo = await Chat.findOne({
        participant_one: participant_id_two,
        participant_two: participant_id_one,
    });

    if (findOne || findTwo) {
        const idChat = findOne ? findOne._id : findTwo._id;
        return resp.status(400).send({ module: "CHAT", message: "pre-existing chat room", chatId: idChat });
    }

    const chat = new Chat({
        participant_one: participant_id_one,
        participant_two: participant_id_two
    });

    chat.save()
        .then((success) => {
            resp.status(201).send(success);
        })
        .catch((error) => {
            resp.status(400).send({ module: "CHAT", message: "error" });
        });
}


async function getAll(req, resp) {
    const { user_id } = req.user;

    Chat.find({
        $or: [{ participant_one: user_id }, { participant_two: user_id }]
    }).populate("participant_one", "-password").populate("participant_two", "-password").then(
        async (chats) => {

            const arrayChats = [];

            for (const chat of chats) {

                const date = await ChatMessage.findOne({ chat: chat._id }).sort({ createdAt: -1 });
                arrayChats.push({
                    ...chat._doc,
                    last_message_date: date?.createdAt || null
                })
            }

            resp.status(200).send(arrayChats);
        }).catch((error) => {
            resp.status(400).send({ module: "CHAT", msg: "Chats not found" });
        });

}

async function deleteChat(req, resp) {

    const { id } = req.params;

    Chat.findByIdAndDelete(id)
        .then((success) => {
            resp.status(200).send(success);
        }).catch((response) => {
            resp.status(400).send({ module: "CHAT", msg: "chat not found" });
        });
}

async function getChat(req, resp) {

    const { id } = req.params;

    Chat.findById(id)
        .populate("participant_one", "-password")
        .populate("participant_two", "-password")
        .then((chat) => {
            if (!chat) {
                resp.status(404).send({ module: "CHAT", msg: "Chat not found" });
            } else {
                resp.status(200).send(chat);
            }
        })
        .catch((error) => {
            resp.status(400).send({ module: "CHAT", msg: "Error finding chat" });
        });
}


export const ChatController = {
    createChat,
    getAll,
    deleteChat,
    getChat
}
