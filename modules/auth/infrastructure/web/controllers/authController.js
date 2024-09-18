import { AuthService } from "../../../application/authService.js";
import { MongoEmployeeRepository } from "../../../../employee/infrastructure/databases/mongodb/mongoEmployeeRepository.js";
import { MongoRoleRepository } from "../../../../../core/infrastructure/databases/mongo/mongoRoleRepository.js";
import { MongoUserRepository } from "../../../../../core/infrastructure/databases/mongo/mongoUserRepository.js";




const repositories = {
    userRepository: new MongoUserRepository(),
    roleRepository: new MongoRoleRepository(),
    employeeRepository: new MongoEmployeeRepository()
}

const authService = new AuthService(repositories);



const refreshToken = async (req, resp) => {

    try {

        const { refreshToken } = req.body;

        const response = await authService.refreshToken(refreshToken);

        resp.status(response.meta.code).send(response);


    } catch (error) {
        resp.status(400).send({ error: error.message });
    }

}

const registerUser = async (req, resp) => {

    try {

        const response = await authService.save(req.body);
        resp.status(response.meta.code).send(response);
    }
    catch (error) {
        resp.status(400).send({ error: error.message });
    }
}

const login = async (req, resp) => {

    const { email, password } = req.body;

    try {

        const response = await authService.login({ email, password });
        resp.status(response.meta.code).send(response);
    } catch (error) {

        resp.status(400).send({ error: error.message });
    }

}

const activateUser = async (req, resp) => {

    try {

        const response = await authService.activateUser(req.body);
        resp.status(response.meta.code).send(response);
    } catch (error) {

        resp.status(400).send({ error: error.message });
    }
}


const generateCode = async (req, resp) => {

    try {
        const {email} = req.body;

        const response = await authService.generateCode(email);
        resp.status(response.meta.code).send(response);
    } catch (error) {
        resp.status(400).send({ error: error.message });
    }
}



export const authController = {
    registerUser,
    login,
    refreshToken,
    activateUser,
    generateCode
}