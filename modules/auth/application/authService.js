import { UserModel } from "../domain/models/userModel.js";
import bcrypt from "bcryptjs";
import { token } from "../../../utils/jwt.js";
import { DATE_ZONE, ETQ_LOG } from "../../../utils/constants.js";
import { generateRandomNumbers, getExpirationTime, isDateLessThanOrEqualToCurrent } from "../../../utils/utils.js";
import { emailController } from "../../../utils/Email.js";


export class AuthService {

    constructor(repositories) {
        this.repositories = repositories;

    }

    async generateCode(email) {

        try {

            const numbers = generateRandomNumbers(4);
            const expire = getExpirationTime();

            const user = await this.repositories.userRepository.findUpdateUserByEmail(email, {
                validationCode: numbers.join('-').trim(),
                validationCodeExpires: expire
            });

            if (user == null) {
                throw new Error("User not found");
            }

            // emailController.sendEmail(email, numbers.join('-').trim());

            return { meta: { code: 200, module: "AUTH", message: "success" } };


        } catch (error) {

            return { meta: { code: 400, module: "AUTH", message: error.message } };
        }
    }


    async activateUser(dataCode) {

        try {

            const { code, email } = dataCode;

            const user = await this.repositories.userRepository.findUserByEmail(email);
            const isDateLess = isDateLessThanOrEqualToCurrent(user.validationCodeExpires, DATE_ZONE);


            if (user.validationCode == code && isDateLess) {

                await this.repositories.userRepository.findUpdateUserByEmail(email, {
                    active: true
                });
                return {
                    meta: { code: 200, module: "AUTH", message: "success" }, data: {
                        access: token.createAccessToken(user),
                        refresh: token.createRefreshToken(user),
                    }
                };
            }



            throw new Error();

        } catch (error) {

            return { meta: { code: 400, module: "AUTH", message: "invalid code" } };
        }
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

            return {
                meta: { code: 200, module: "AUTH", message: "success" }, data: {
                    access: token.createAccessToken(user)
                }
            };

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
                return { meta: { code: 401, module: "AUTH", message: "Invalid user or password" } };
            }


            const isDateLess = isDateLessThanOrEqualToCurrent(user.validationCodeExpires, DATE_ZONE);

            if (!user.active && !isDateLess) {

                const numbers = generateRandomNumbers(4);
                const expire = getExpirationTime();

                await this.repositories.userRepository.findUpdateUserById(user._id, {
                    validationCode: numbers.join('-').trim(),
                    validationCodeExpires: expire
                });

                emailController.sendEmail(email, numbers.join('-').trim());

            }

            return {
                meta: { code: 200, module: "AUTH", message: "success" },
                data: {
                    access: token.createAccessToken(user),
                    refresh: token.createRefreshToken(user),
                    active: user.active
                }
            };

        } catch (error) {
            return { meta: { code: 400, module: "AUTH", message: error.message } }
        }

    }



    async save(userData) {

        const { email, password, idEmployee, name, businessName, businessType } = userData;

        console.log(userData);

        let idRole = undefined;
        let roleName = "customer";
        let active = false;



        if (idEmployee) {


            const employee = await this.repositories.employeeRepository.findEmployeeById(idEmployee);

            if (employee == undefined) {
                return { meta: { code: 400, module: "AUTH", message: "Employee not found" } }
            }

            roleName = employee.type;
        }


        idRole = await this.repositories.roleRepository.getRoleByName(roleName);

        if (idRole == undefined) {
            return { meta: { code: 400, module: "AUTH", message: "Role not found" } }
        }


        try {

            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);

            const userModel = new UserModel(email, hashPassword, active, idRole);


            let infoUser = undefined;

            if (idEmployee) {
                infoUser = { idEmployee: idEmployee };
            } else {
                infoUser = { name: name, businessName: businessName, businessType: businessType };
            }


            const user = await this.repositories.userRepository.save(userModel, infoUser);
            console.log("Usuario")
            console.log(user)
            this.generateCode(user._id, email);

            return { meta: { code: 201, module: "AUTH", message: "success" }, data: user };


        } catch (error) {

            const message = error.message != undefined &&
                error.message.indexOf("duplicate key") ? "User already created" : "Error";


            return { meta: { code: 400, module: "AUTH", message: message } };
        }

    }
}