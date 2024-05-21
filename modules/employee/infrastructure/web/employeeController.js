import { EmployeeService } from "../../application/employeeService.js";
import { MongoEmployeeRepository } from "../databases/mongodb/mongoEmployeeRepository.js";



const repositories = {
    employeeRepository: new MongoEmployeeRepository(),
}


const employeeService = new EmployeeService(repositories);



const findAll = async (req,resp) =>{

    try{

       const response = await employeeService.findAll();
       return resp.status(response.meta.code).send(response);  

    }
    catch(error){

        return resp.status(400).send({meta:{code:400,message:"Error",module:"EMPLOYEE"}});
    }
};


const createEmployee = async (req,resp) =>{

    try{

       const response = await employeeService.createEmployee(req.body);
       return resp.status(response.meta.code).send(response);  

    }
    catch(error){

        return resp.status(400).send({meta:{code:400,message:"Error",module:"EMPLOYEE"}});
    }
};


export const employeeController = {
    createEmployee,
    findAll
}