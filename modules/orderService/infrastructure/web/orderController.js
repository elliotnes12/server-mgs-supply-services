import { ServiceOrder } from "../../application/serviceOrder.js";
import { MongoServiceRepository } from "../databases/mongodb/mongoServiceRepository.js";



const repositories = {
    orderRepository: new MongoServiceRepository(),
}


const serviceOrder = new ServiceOrder(repositories);



const findAll = async (req, resp) => {
    try {

        const { limit } = req.params;

        const response = await serviceOrder.findAll(limit);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: "Error", module: "SERVICE_ORDER" } });
    }
}

const findAllByIdSupervisor = async (req, resp) => {

    try{

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const { id_supervisor } = req.params;

        const response = await serviceOrder.findAllByIdSupervisor(page, limit, id_supervisor);
  
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
    findAll,
    findAllByIdSupervisor,
   assignServiceOrder
}