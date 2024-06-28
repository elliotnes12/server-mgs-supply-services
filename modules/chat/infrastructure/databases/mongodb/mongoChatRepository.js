import { User } from "../../../../../core/infrastructure/databases/mongo/entities/user.js";
import { Customer } from "../../../../../models/index.js";
import { Employee } from "../../../../employee/infrastructure/databases/mongodb/entities/employee.js";
import { ChatRepository } from "../../../domain/ports/chatRepository.js";
import { Chat } from "./entities/chat.js";
import { ChatMessage } from "./entities/chat_message.js";

export class MongoChatRepository extends ChatRepository {



    async getLastMessageByChatId(chatId) {
        return await ChatMessage.findOne({ chat: chatId }).sort({ createdAt: -1 });
    }
    async getTotalMessagesByChatId(chatId) {
        return await ChatMessage.countDocuments({ chat: chatId });
    }

    async getAllMessagesByChatId(chatId) {

        console.log(chatId);
        const messages = await ChatMessage.find({ chat: chatId }).sort({ createdAt: 1 })
            .populate("user", "-password");

        const total = await ChatMessage.countDocuments({ chat: chatId });

        return { messages: messages, total: total };
    }

    async sendImageChat(chatId, path, userId) {

        const chat_message = new ChatMessage({
            chat: chatId,
            user: userId,
            message: path,
            type: "IMAGE"
        });

        await chat_message.save();

        return await ChatMessage.findById(chat_message._id).populate("user");

    }
    async sendMessageChat(chatId, message, userId) {

        const chat_message = new ChatMessage({
            chat: chatId,
            user: userId,
            message: message,
            type: "TEXT"
        });

        await chat_message.save();

        return await ChatMessage.findById(chat_message._id).populate("user");
    }


    async getChatById(chatId) {

        return await Chat.findById(chatId)
            .populate("participant_one", "-password")
            .populate("participant_two", "-password");
    }
    async findAllChatsByUserId(userId) {

        const allChats = new Array();

        const chats = await Chat.find({
            $or: [
                { participant_one: userId },
                { participant_two: userId }
            ]
        });

        for (const chat of chats) {

            const id = chat.participant_one != userId ? chat.participant_one : chat.participant_two;

            
            const user = await User.findOne({ _id: id }).populate("role");

            if (user.role.name == "customer") {

                const customer = await Customer.findOne({ user: user._id });

                allChats.push({
                    role: user.role.name,
                    idUser: user._id,
                    name: customer.name,
                    idChat: chat._id
                })

            } else {

                const employee = await Employee.findOne({ user: user._id });

                allChats.push({
                    role: user.role.name,
                    idUser: user._id,
                    name: employee.name,
                    idChat: chat._id
                })

            }
        }


        return allChats;
    }

    async deleteChat(chatId) {
        return await Chat.findByIdAndDelete(chatId);
    }

    async findOneChatByUsers(participant_id_one, participant_id_two) {

        const findOne = await Chat.findOne({
            participant_one: participant_id_one,
            participant_two: participant_id_two
        });

        const findTwo = await Chat.findOne({
            participant_one: participant_id_two,
            participant_two: participant_id_one,
        });

        if (findOne || findTwo) {
            return findOne ? findOne._id : findTwo._id;
        }

        return false;
    }

    async save(participant_id_one, participant_id_two) {

        const chat = new Chat({
            participant_one: participant_id_one,
            participant_two: participant_id_two
        });

        return await chat.save();
    }

}


