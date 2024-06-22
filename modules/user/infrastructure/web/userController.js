import { MongoUserRepository } from "../../../../core/infrastructure/databases/mongo/mongoUserRepository.js";
import { UserService } from "../../application/userService.js";




const repositories = {
    userRepository: new MongoUserRepository(),
}


const userService = new UserService(repositories);


const findUserById = async (req, resp) => {

    const { id } = req.params;

    try {
        const response = await userService.findUserById(id);
        return resp.status(response.meta.code).send(response);
    }
    catch (error) {
        return resp.status(400).send("error");
    }

}

const getMe = async (req, resp) => {

    const { user_id } = req.user;

    try {
        const response = await userService.getMe(user_id);
        return resp.status(response.meta.code).send(response);
    }
    catch (error) {
        console.log(error);
        return resp.status(400).send("error");
    }

}

const getAll = async(req,resp) =>{


    const { user_id } = req.user;

    try {
        const response = await userService.getAll(user_id);
        return resp.status(response.meta.code).send(response);
    }
    catch (error) {
        return resp.status(400).send("error");
    }


}



export const userController = {
    getMe,
    getAll,
    findUserById
}