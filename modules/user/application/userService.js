

export class UserService {


    constructor(repositories) {
        this.repositories = repositories;
    }

    async findUserById(userId){
        try{
            const user = await this.repositories.userRepository.findUserById(userId);

            if(user == undefined){
                throw new Error();
            }

            return { meta: { code: 200, module: "USER", message: "success" },
              data:user
            };
 
         }catch(error){
             return { meta: { code: 400, module: "USER", message: "User not found" } };
         }

    }

    async getAll(userId){
        try{
           const users = await this.repositories.userRepository.findAll(userId);
           return { meta: { code: 200, module: "USER", message: "success" },
             data:users
           };

        } catch (error) {
            return { meta: { code: 400, module: "USER", message: "Users not found" } };
        }
    }

    async getAllSupport(userId){
        try{
           const users = await this.repositories.userRepository.findAllSupport(userId);
           return { meta: { code: 200, module: "USER", message: "success" },
             data:users
           };

        } catch (error) {
            return { meta: { code: 400, module: "USER", message: "Users not found" } };
        }
    }


    async getMe(userId){

        try{

            const user = await this.repositories.userRepository.findUserByIdWithRole(userId)
            
            return { meta: { code: 200, module: "USER", message: "success" }, data: user };

        }
        catch(error){

            return { meta: { code: 400, module: "USER", message: "User not found" } };
        }
          
    }



    async getCustomerByEmail(email) {

        try {

            const user = await this.repositories.userRepository.findUserByEmailWithRole(email)

            if (user == null || user == undefined) {
                throw new Error("customer not found");
            }
            return { meta: { code: 200, module: "USER", message: "success" }, data: user };

        }
        catch (error) {

            return { meta: { code: 400, module: "USER", message: "User not found" } };
        }

    }

}