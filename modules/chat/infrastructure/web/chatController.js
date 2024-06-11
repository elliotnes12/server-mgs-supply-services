import { getFilePath } from "../../../../utils/utils.js";
import { ChatService } from "../../application/chatService.js";
import { MongoChatRepository } from "../databases/mongodb/mongoChatRepository.js";



const repositories = {
    chatRepository: new MongoChatRepository(),
}


const chatService = new ChatService(repositories);


/*********************************************
************************************************** 
MESSAGE CHAT
*/

const getLastMessageByChatId = async (req,resp) =>{

    try{

        const { chat_id } = req.params;

        const response = await chatService.getLastMessageByChatId(chat_id);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"CHAT"}});
      }
}

const getTotalMessages = async (req,resp) =>{

    try{

        const { chat_id } = req.params;

        const response = await chatService.getTotalMessages(chat_id);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"CHAT"}});
      }

}
const getAllMessagesByChatId = async (req,resp) =>{

    try{

        const { chat_id } = req.params;

        const response = await chatService.getAllMessagesByChatId(chat_id);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"CHAT"}});
      }

}

const sendImageChat = async (req,resp) =>{

    try{

        const { chat_id } = req.body;
        const { user_id } = req.user;
        const path = getFilePath(req.files.image);
    

        const response = await chatService.sendImageChat(chat_id,path,user_id);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"CHAT"}});
      }

}

const sendMessageChat = async (req,resp) =>{

    try{

        const { chat_id, message } = req.body;
        const { user_id } = req.user;
    

        const response = await chatService.sendMessageChat(chat_id,message,user_id);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"CHAT"}});
      }

}




/*********************************************
************************************************** 
CHAT
*/


const getChatById = async (req,resp) =>{

    try{

        const { id } = req.params;

        const response = await chatService.getChatById(id);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"CHAT"}});
      }

}

const getAllChatsByUserId = async (req,resp) =>{

    try{

        const { user_id } = req.user;

        const response = await chatService.getAll(user_id);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"CHAT"}});
      }

}

const save = async (req, resp) => {

    try{

      const { participant_id_one, participant_id_two } = req.body;
      const response = await chatService.save(participant_id_one,participant_id_two);

      return resp.status(response.meta.code).send(response);

    }
    catch(error){
        return resp.status(400).send({meta:{code:400,message:"Error",module:"CHAT"}});
    }
}


const deleteChat = async (req, resp) => {

    try{


      const { id } = req.params;
      const response = await chatService.deleteChat(id);

      return resp.status(response.meta.code).send(response);

    }
    catch(error){
        console.log(error);
        return resp.status(400).send({meta:{code:400,message:"Error",module:"CHAT"}});
    }
}



export const chatController = {
   save,
   deleteChat,
   getAllChatsByUserId,
   getChatById,
   sendMessageChat,
   sendImageChat,
   getAllMessagesByChatId,
   getTotalMessages,
   getLastMessageByChatId
}