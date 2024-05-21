import { UserModel } from "../domain/models/userModel.js";
import bcrypt from "bcryptjs";
import { token } from "../../../utils/jwt.js";
import { ETQ_LOG } from "../../../utils/constants.js";

export class AuthService {

    constructor(repositories) {
        this.repositories = repositories;

    }


    async refreshToken(refreshToken) {


        if (!refreshToken) {
            return { meta: { code: 400, module: "AUTH", message: "refresh token required" } };
        }

        const hasExpired = token.hasExpiredToken(refreshToken);

        if (hasExpired) {
            return { meta: { code: 400, module: "AUTH", message: "Expired Token" } };
        }

        try {

            const { user_id } = token.decode(refreshToken);
            const user = await this.repositories.userRepository.findUserById(user_id);

            return { meta: { code: 200, module: "AUTH", message: "success" }, data: {
                access: token.createAccessToken(user)
            } };

        }
        catch (error) {
            return { meta: { code: 400, module: "AUTH", message: "User not found" } };
        }



    }
    async login(userData) {

        const { email, password } = userData;

        try {

            const user = await this.repositories.userRepository.findUserByEmail(email);

            if (user == undefined) {
                return { meta: { code: 400, module: "AUTH", message: "User not found" } };
            }

            const result = await bcrypt.compare(password, user.password);

            if (!result) {
                return { meta: { code: 401, module: "AUTH", message: "No Authorized" } };
            }


            return {
                meta: { code: 200, module: "AUTH", message: "success" },
                data: {
                    access: token.createAccessToken(user),
                    refresh: token.createRefreshToken(user)
                }
            };

        } catch (error) {

            return { meta: { code: 400, module: "AUTH", message: "User not found" } }
        }

    }


    async save(userData) {

        const { email, password, idEmployee } = userData;
        let idRole = undefined;
        let roleName = "customer";
        let active = false;



        if (idEmployee) {


            const employee = await this.repositories.employeeRepository.findEmployeeById(idEmployee);

            if (employee == undefined) {
                return { meta: { code: 400, module: "AUTH", message: "Employee not found" } }
            }

            roleName = employee.type;
            active = false;

        }


        idRole = await this.repositories.roleRepository.getRoleByName(roleName);

        if (idRole == undefined) {
            return { meta: { code: 400, module: "AUTH", message: "Role not found" } }
        }


        try {

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            const userModel = new UserModel(email, hashPassword, active, idRole);

            const user = await this.repositories.userRepository.save(userModel);

            if (idEmployee) {
                await this.repositories.employeeRepository.findUpdateEmployeeById(idEmployee, user._id);
            }


            return { meta: { code: 201, module: "AUTH", message: "success" }, data: user };


        } catch (error) {

            return { meta: { code: 400, module: "AUTH", message: "Error" } };
        }

    }
}