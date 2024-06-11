import { ServiceOrder } from "../../application/serviceOrder.js";
import { MongoOrderRepository } from "../databases/mongodb/mongoOrderRepository.js";



const repositories = {
    orderRepository: new MongoOrderRepository(),
}


const serviceOrder = new ServiceOrder(repositories);


const findAllBySupervisor = async (req,resp) =>{

    try{

        const { id } = req.params;
        const response = await serviceOrder.findAllBySupervisor(id);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"SERVICE_ORDER"}});
      }
}


const assignServiceOrder = async (req,resp) =>{

    try{

        const { id, employees } = req.body;
        const response = await serviceOrder.assignServiceOrder(id,employees);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"SERVICE_ORDER"}});
      }
}

const save = async (req,resp) =>{

    try{

        const { user_id } = req.user;
        const response = await serviceOrder.save(user_id,req.body);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
          return resp.status(400).send({meta:{code:400,message:"Error",module:"SERVICE_ORDER"}});
      }
}

export const orderController = {
   save,
   findAllBySupervisor,
   assignServiceOrder
}