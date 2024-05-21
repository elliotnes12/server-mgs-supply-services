


export class PermissionService {

    constructor(repositories) {
        this.repositories = repositories;
    }

    async findAll(){

        try{

            const permissions = await this.repositories.permissionRepository.findAll();

            return {
                meta: { code: 200, module: "PERMISSION", message: "success" },
                data: permissions 
            };
        }
        catch(error){

            return { meta: { code: 400, module: "EMPLOYEE", message: "Error" } };
        }
    }
    async createPermission(dataPermission) {

        try {

            const permission = await this.repositories.permissionRepository.save(dataPermission);

            return {
                meta: { code: 200, module: "PERMISSION", message: "success" },
                data: permission 
            };

        } catch (error) {
            return { meta: { code: 400, module: "PERMISSION", message: "permisssion already registered" } };
        }
    }
}