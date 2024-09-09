import { CustomerService } from "../../application/customerService.js";
import { MongoCustomerRepository } from "../databases/mongodb/mongoCustomerRepository.js";



const repositories = {
    customerRepository: new MongoCustomerRepository(),
}


const customerService = new CustomerService(repositories);



const findAll = async (req,resp) =>{

    try{
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const response = await customerService.findAll(page, limit);
       return resp.status(response.meta.code).send(response);  

    }
    catch(error){

        return resp.status(400).send({meta:{code:400,message:"Error",module:"CUSTOMER"}});
    }
};


const findByBusinessName = async (req, resp) => {

    try {
        const { businessName } = req.body;
        const response = await customerService.findByBusinessName(businessName);
        return resp.status(response.meta.code).send(response);

    }
    catch (error) {

        return resp.status(400).send({ meta: { code: 400, message: "Error", module: "CUSTOMER" } });
    }
}
const findByName = async (req, resp) => {

    try {
        const { name } = req.body;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const response = await customerService.findByName(name, page, limit);
        return resp.status(response.meta.code).send(response);

    }
    catch (error) {

        return resp.status(400).send({ meta: { code: 400, message: "Error", module: "CUSTOMER" } });
    }
}

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
    findAll,
    findByName,
    findByBusinessName
}