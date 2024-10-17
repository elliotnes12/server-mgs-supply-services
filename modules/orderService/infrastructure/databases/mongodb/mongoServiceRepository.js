import { IServiceRepository } from "../../../domain/ports/ICreateServiceRepository.js";
import { Appointment } from "./entities/appointment.js";

export class MongoServiceRepository extends IServiceRepository {


    async save(order) {

        const appointment = new Appointment(order);

        return await appointment.save();
    }


    async updateOrder(id, data) {
        return await Appointment.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        );
    }

    async findAllByIdSupervisor(page = 1, limit = 20, id_supervisor) {

        const skip = (page - 1) * limit;

        return Appointment.find({ supervisor: id_supervisor })
            .populate("customer")
            .sort({ createdAt: -1 }).skip(skip).limit(limit)
    }


    async findAllByIdCustomer(page = 1, limit = 20, id_customer) {

        const skip = (page - 1) * limit;

        return Appointment.find({ customer: id_customer })
            .sort({ createdAt: -1 }).skip(skip).limit(limit)
    }

    async findAll(limit) {
        return Appointment.find().sort({ status: 1 })
            .limit(limit > 0 ? limit : undefined)
    }

    async findAllServicesByStatus(limit, status) {
        return await Appointment.find({ status: status })
            .populate("customer")
            .sort({ createdAt: -1 })
            .limit(limit);
    }

    async findAllByManager(page = 1, limit = 20) {
        const skip = (page - 1) * limit;

        return await Appointment.find()
            .populate("customer")
            .sort({ createdAt: -1 })
            .skip(skip).limit(limit)
    }

    async findAllByInProgress(page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        return await Appointment.find({ status: 'in_progress' }).select("-comments -photos -customer -address -hour -until")
            .populate({ path: "employees", select: "-active -user -type -__v" })
            .populate({ path: "supervisor", select: "-active -user -type -__v" })
            .populate({ path: "customer", select: "-user -__v" })
            .sort({ createdAt: -1 })
            .skip(skip).limit(limit)
    }

    async findAllByInProgressAndSupervisor(page = 1, limit = 20, supervisor) {

        const skip = (page - 1) * limit;

        return await Appointment.find({ status: 'in_progress', supervisor: supervisor })
            .select("-comments -photos -customer -address -hour -until")
            .populate({ path: "employees", select: "-active -user -type -__v" })
            .populate({ path: "supervisor", select: "-active -user -type -__v" })
            .populate({ path: "customer", select: "-user -__v" })
            .sort({ createdAt: -1 })
            .skip(skip).limit(limit)
    }

    async updateStatus(id, status) {

        return await Appointment.findOneAndUpdate(
            { _id: id },
            { status: status },
            { new: true }
        );
    }

    async findById(id) {
        return await Appointment.findOne({
            _id: id
        }).populate({ path: "supervisor", select: "-active -user -type -__v" })
            .populate({ path: "customer", select: "-user -__v" })

    }

    async findAllServicesByEmployeeId(employeeId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;

        return Appointment.find({ employees: employeeId })
            .populate("customer")
            .populate("employees", "-active -user -type -__v")
            .populate("supervisor", "-active -user -type -__v")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }

    async findAllServicesByInProgressAndEmployeeId(employeeId, page = 1, limit = 20) {
        const skip = (page - 1) * limit;

        return Appointment.find({ employees: employeeId, status: 'in_progress' })
            .populate("customer")
            .populate("employees", "-active -user -type -__v")
            .populate("supervisor", "-active -user -type -__v")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    }

}


