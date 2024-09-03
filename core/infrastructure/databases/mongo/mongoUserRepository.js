import { Customer, Employee } from "../../../../models/index.js";
import { ROLES } from "../../../../utils/constants.js";
import { userRepository } from "../../../domain/ports/userRepository.js";
import { User } from "./entities/user.js";
import mongoose from "mongoose";

export class MongoUserRepository extends userRepository {

    async save(user, userInfo) {

        const { idEmployee, name, businessName, businessType } = userInfo;

        const session = await mongoose.startSession();
        session.startTransaction();

        try {

            const userModel = new User(user);
            const newUser = await userModel.save({ session });

            if (idEmployee) {
                await this.findUpdateEmployeeById(idEmployee, newUser._id, session);
            } else {
                await this.createCustomer(newUser._id, name, session, businessName, businessType);
            }

            await session.commitTransaction();
            session.endSession();
        } catch (error) {
            console.log(error);
            await session.abortTransaction();
            session.endSession();
            throw new Error(error.message);
        }

        return user;
    }

    async findUserByEmail(email) {
        const emailLower = email.toLowerCase();
        return await User.findOne({ email: emailLower });
    }

    async findUserById(userId) {
        return await User.findById(userId).select("-password");
    }

    async findUserByIdWithRole(userId) {


        try {

            const user = await User.findById(userId).select("-password")
                .populate('role');

            const roleName = user.role.name;

            console.log("encontraste rol");
            console.log(roleName)

            if (roleName === "customer") {
                const customer = await Customer.findOne({
                    user: user._id
                })
                return { user, customer };
            }


            const employee = await Employee.findOne({
                user: user._id
            });

            return { user, employee };


        }
        catch (error) {
            throw new Error(error.message);
        }
    }

    async findAll(userId) {
        const users = await User.find({ _id: { $ne: userId } })
            .select("-password").populate("role", "-permissions");

        const response = new Array();

        for (const user of users) {
            const role = user.role.name;

            if (role == ROLES.CUSTOMER) {

                const customer = await Customer.findOne({
                    user: user._id
                })

                response.push(
                    {
                        id: user._id,
                        idCustomer: customer._id,
                        name: customer.name,
                        type: "customer"
                    }
                );
            } else {

                const employee = await Employee.findOne({
                    user: user._id
                })

                response.push(
                    {
                        id: user._id,
                        idEmployee: employee.idEmployee,
                        name: employee.name,
                        type: employee.type
                    }
                );

            }

        }

        return response;
    }


    async findAllSupport(userId) {
        const users = await User.find({ _id: { $ne: userId } })
        .select("-password").populate("role");

    const response = new Array();

    for (const user of users) {
        const role = user.role.name;

        if (role == "supervisor") {

            const employee = await Employee.findOne({
                user: user._id
            })

            response.push(
                {
                    id: user._id,
                    idEmployee: employee.idEmployee,
                    name: employee.name,
                    type: employee.type
                }
            );

        }

    }

    return response;
    }

    async findUpdateEmployeeById(id, userId, session) {
        return await Employee.findOneAndUpdate(
            { idEmployee: id },
            { user: userId },
            { new: true, session }
        );
    }

    async findUpdateUserById(id, data) {
        return await User.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );
    }

    async createCustomer(userId, pName, session, pBusinessName, pBusinessType) {

        const newCustomer = new Customer({
            user: userId,
            name: pName,
            businessName: pBusinessName,
            businessType: pBusinessType
        });

        await newCustomer.save({ session });
    }
}
