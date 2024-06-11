
export class ChatRepository {

    findOneChatByUsers(participant_id_one, participant_id_two) {
        throw new Error("Method 'findOneChatBy' must be implemented.")
    }

    save(participant_id_one, participant_id_two) {
        throw new Error("Method 'save' must be implemented.")
    }

    deleteChat(chatId) {
        throw new Error("Method 'deleteChat' must be implemented.");
    }

    findAll(userId) {
        throw new Error("Method 'findAll' must be implemented.");
    }

    getChatById(chatId) {
        throw new Error("Method 'getChatById' must be implemented.");
    }

    sendMessageChat(chatId, message, userId) {
        throw new Error("Method 'saveMessageChat' must be implemented.");
    }

    sendImageChat(chatId, path, userId) {
        throw new Error("Method 'saveMessageChat' must be implemented.");
    }

    getAllMessagesByChatId(chatId){
        throw new Error("Method 'getAllMessagesByChatId' must be implemented.");
    }

    getTotalMessagesByChatId(chatId){
        throw new Error("Method 'getTotalMessagesByChatId' must be implemented.");
    }

    getLastMessageByChatId(chatId){
        throw new Error("Method 'getLastMessageByChatId' must be implemented.");
    }
}