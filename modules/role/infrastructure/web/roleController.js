import { MongoRoleRepository } from "../../../../core/infrastructure/databases/mongo/mongoRoleRepository.js";
import { RoleService } from "../../application/roleService.js";




const repositories = {
    roleRepository: new MongoRoleRepository(),
}


const roleService = new RoleService(repositories);



const findAll = async (req,resp) =>{

    try{

       const response = await roleService.findAll();
       return resp.status(response.meta.code).send(response);  

    }
    catch(error){
        
        return resp.status(400).send({meta:{code:400,message:"Error",module:"ROLE"}});
    }
};


const createRole = async (req,resp) =>{

    try{

       const response = await roleService.createRole(req.body);
       return resp.status(response.meta.code).send(response);  

    }
    catch(error){

        return resp.status(400).send({meta:{code:400,message:"Error",module:"ROLE"}});
    }
};


export const roleController = {
    createRole,
    findAll
}