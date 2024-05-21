import { PermissionService } from "../../application/permissionService.js";
import { MongoPermissionRepository } from "../databases/mongodb/mongoPermissionRepository.js";


const repositories = {
    permissionRepository: new MongoPermissionRepository(),
}


const permissionService = new PermissionService(repositories);



const findAll = async (req,resp) =>{

    try{

       const response = await permissionService.findAll();
       return resp.status(response.meta.code).send(response);  

    }
    catch(error){

        return resp.status(400).send({meta:{code:400,message:"Error",module:"PERMISSION"}});
    }
};


const createPermission = async (req,resp) =>{

    try{

       const response = await permissionService.createPermission(req.body);
       return resp.status(response.meta.code).send(response);  

    }
    catch(error){

        return resp.status(400).send({meta:{code:400,message:"Error",module:"EMPLOYEE"}});
    }
};


export const permissionController = {
    createPermission,
    findAll
}