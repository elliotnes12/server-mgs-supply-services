import { io } from "../../../utils/socketServer.js";



export class ChatService {

    constructor(repositories) {
        this.repositories = repositories;
    }


    async getLastMessageByChatId(chatId) {

        try {

            console.log(chatId)
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

            console.log(chatId)
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
            console.log(error);
            return { meta: { code: 404, module: "CHAT", message: "Error sendImageChat" } };
        }
    }

    async sendMessageChat(chatId, message, userId) {
        try {
            const data = await this.repositories.chatRepository.sendMessageChat(chatId, message, userId);
    
            console.log(`Emitiendo mensaje al canal ${chatId}`);
            io.sockets.in(chatId).emit("message", data);
            console.log(`Emitiendo notificación de mensaje al canal ${chatId}_notify`);
            io.sockets.in(`${chatId}_notify`).emit("message_notify", data);
    
            return {
                meta: { code: 200, module: "CHAT", message: "Mensaje enviado" }, data: data
            };
        } catch (error) {
            console.error("Error al enviar el mensaje:", error);
            return { meta: { code: 404, module: "CHAT", message: "Error sendMessageChat" + "- chatId- " + chatId + "-userId-" + userId } };
        }
    }
    


    async getChatById(chatId) {

        try {

            const chat = await this.repositories.chatRepository.getChatById(chatId);

            console.log(chat);
            return {
                meta: { code: 200, module: "CHAT", message: "success" }, data: chat
            };



        }
        catch (error) {
            console.log(error)
            return { meta: { code: 404, module: "CHAT", message: "Error" } };
        }
    }



    async getAll(userId) {

        try {

            console.log("PASO ACA USER" + userId)
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
            console.log(error)
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
                throw new Error();
            }

            const chat = await this.repositories.chatRepository.save(participant_id_one, participant_id_two);

            return {
                meta: { code: 201, module: "CHAT", message: "success" }, data: chat
            };


        } catch (error) {
            return {
                meta: { code: 200, module: "CHAT", message: "CHAT Error Save " + error }, data: {
                    chatId: idChat
                }
            };
        }
    }
}