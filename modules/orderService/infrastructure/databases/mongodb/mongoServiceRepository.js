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
            .sort({ status: 1 }).skip(skip).limit(limit)
    }


    async findAllByIdCustomer(page = 1, limit = 20, id_customer) {

        const skip = (page - 1) * limit;

        return Appointment.find({ customer: id_customer })
            .sort({ status: 1 }).skip(skip).limit(limit)
    }

    async findAll(limit) {
        return Appointment.find().sort({ status: 1 })
            .limit(limit > 0 ? limit : undefined)
    }

    async findAllServicesByInStatus(limit, status) {
        return await Appointment.find({ status: status })
            .populate("customer")
            .sort({ createdAt: -1 })
            .limit(limit);
    }

    async findAllByInProgress(page = 1, limit = 20) {

        const skip = (page - 1) * limit;

        return await Appointment.find({ status: 'in_progress' })
            .populate("customer")
            .sort({ createdAt: -1 })
            .skip(skip).limit(limit)
    }


}


