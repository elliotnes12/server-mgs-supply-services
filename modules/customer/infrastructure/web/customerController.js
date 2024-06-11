import { CustomerService } from "../../application/customerService.js";
import { MongoCustomerRepository } from "../databases/mongodb/mongoCustomerRepository.js";



const repositories = {
    customerRepository: new MongoCustomerRepository(),
}


const customerService = new CustomerService(repositories);



const findAll = async (req,resp) =>{

    try{

       const response = await customerService.findAll();
       return resp.status(response.meta.code).send(response);  

    }
    catch(error){

        return resp.status(400).send({meta:{code:400,message:"Error",module:"CUSTOMER"}});
    }
};


const createCustomer = async (req,resp) =>{

    try{

       const response = await customerService.createCustomer(req.body);
       return resp.status(response.meta.code).send(response);  

    }
    catch(error){

        return resp.status(400).send({meta:{code:400,message:"Error",module:"CUSTOMER"}});
    }
};


export const customerController = {
    createCustomer,
    findAll
}