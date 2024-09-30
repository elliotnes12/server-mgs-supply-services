import { RoleRepository } from "../../../domain/ports/roleRepository.js";
import {Role } from "./entities/role.js";




export class MongoRoleRepository extends RoleRepository{


    async getRoleByName(name) {
        const role = await Role.findOne({ name: name });
        return role? role._id : undefined;
    }

    async findAll(){
        return await Role.find();
    }
 
}

