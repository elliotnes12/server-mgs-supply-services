import { io } from "../../../utils/socketServer.js";



export class ChatService {

    constructor(repositories) {
        this.repositories = repositories;
    }


    async getLastMessageByChatId(chatId) {

        try {

            const chat = await this.repositories.chatRepository.getLastMessageByChatId(chatId);

            return {
                meta: { code: 200, module: "CHAT", message: "success" }, data: chat
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "CHAT", message: "Error getLastMessageByChatId" } };
        }

    }


    async getTotalMessages(chatId) {

        try {

            const total = await this.repositories.chatRepository.getTotalMessagesByChatId(chatId);

            return {
                meta: { code: 200, module: "CHAT", message: "success" }, data: {
                    total: total
                }
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "CHAT", message: "Error getTotalMessages" } };
        }

    }

    async getAllMessagesByChatId(chatId) {


        try {

            const data = await this.repositories.chatRepository.getAllMessagesByChatId(chatId);

            return {
                meta: { code: 200, module: "CHAT", message: "success" }, data: data
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "CHAT", message: "Error getAllMessagesByChatId" } };
        }

    }

    async sendImageChat(chatId, path, userId) {


        try {

            const data = await this.repositories.chatRepository.sendImageChat(chatId, path, userId);

            io.sockets.in(chatId).emit("message", data);
            io.sockets.in(`${chatId}_notify`).emit("message_notify", data);


            return {
                meta: { code: 200, module: "CHAT", message: "send message" }, data: data
            };


        }
        catch (error) {
            return { meta: { code: 404, module: "CHAT", message: "Error sendImageChat" } };
        }
    }

    async sendMessageChat(chatId, message, userId) {
        try {
            const data = await this.repositories.chatRepository.sendMessageChat(chatId, message, userId);

            const totalMessages = await this.getTotalMessages(chatId);

            if (totalMessages.data?.total == 1) {

                const { data } = await this.getChatById(chatId);

                const idParcipant = data.participant_one._id != userId ? data.participant_one._id : data.participant_two._id;
                const notifyChat = await this.repositories.chatRepository.getChatNotifyById(chatId, userId);
                io.sockets.in(`user_channel_${idParcipant}`).emit("message_notify", notifyChat);

            }
            io.sockets.in(chatId).emit("message", data);
            io.sockets.in(`${chatId}_notify`).emit("message_notify", data);
    
            return {
                meta: { code: 200, module: "CHAT", message: "Mensaje enviado" }, data: data
            };
        } catch (error) {
            return { meta: { code: 404, module: "CHAT", message: "Error sendMessageChat" + "- chatId- " + chatId + "-userId-" + userId } };
        }
    }
    


    async getChatById(chatId) {

        try {

            const chat = await this.repositories.chatRepository.getChatById(chatId);

            return {
                meta: { code: 200, module: "CHAT", message: "success" }, data: chat
            };



        }
        catch (error) {
            return { meta: { code: 404, module: "CHAT", message: "Error" } };
        }
    }



    async getAll(userId) {

        try {

            const chats = await this.repositories.chatRepository.findAllChatsByUserId(userId);

            if (chats.length == 0) {

                return {
                    meta: { code: 404, module: "CHAT", message: "success" }, data: []
                };

            }

            return {
                meta: { code: 200, module: "CHAT", message: "success" }, data: chats
            };

        }
        catch (error) {
            return { meta: { code: 404, module: "CHAT", message: "Error" } };
        }
    }

    async deleteChat(chatId) {

        try {

            const chat = await this.repositories.chatRepository.deleteChat(chatId);

            if (!chat) {
                throw new Error();
            }

            return {
                meta: { code: 200, module: "CHAT", message: "success" }, data: chat
            };

        }
        catch (error) {
            return { meta: { code: 404, module: "CHAT", message: "Error" } };
        }
    }

    async save(participant_id_one, participant_id_two) {

        let idChat = undefined;
        try {

            idChat = await this.repositories.chatRepository.findOneChatByUsers(participant_id_one, participant_id_two);

            if (idChat != undefined) {
                return {
                    meta: { code: 200, module: "CHAT", message: "success" }, data: {
                        chatId: idChat
                    }
                }
            }

            const chat = await this.repositories.chatRepository.save(participant_id_one, participant_id_two);

            return {
                meta: { code: 201, module: "CHAT", message: "success" }, data: {
                    chatId: chat._id
                }
            };


        } catch (error) {
            return {
                meta: { code: 500, module: "CHAT", message: error }
            };
        }
    }
}