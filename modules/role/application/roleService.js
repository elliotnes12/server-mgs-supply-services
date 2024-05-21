


export class RoleService {

    constructor(repositories) {
        this.repositories = repositories;
    }

    async findAll(){

        try{

            const roles = await this.repositories.roleRepository.findAll();

            return {
                meta: { code: 200, module: "ROLE", message: "success" },
                data: roles 
            };
        }
        catch(error){
            console.log(error);
            return { meta: { code: 400, module: "ROLE", message: "Error" } };
        }
    }
    async createRole(dataRole) {

        try {

            const role = await this.repositories.roleRepository.save(dataRole);

            return {
                meta: { code: 200, module: "ROLE", message: "success" },
                data: role 
            };

        } catch (error) {
            return { meta: { code: 400, module: "ROLE", message: "role already registered" } };
        }
    }
}