
import { PermissionRepository } from "../../../domain/ports/permissionRepository.js";
import { Permission } from "./entities/permissions.js";


export class MongoPermissionRepository extends PermissionRepository {

    async save(dataPermission){

        const permission = new Permission(dataPermission);
        return permission.save();
    }

    async findAll(){
        return await Permission.find();    
    }


}


