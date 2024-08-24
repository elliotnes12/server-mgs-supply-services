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

    async findAllByIdSupervisor(id, limit) {
        return Appointment.find({ supervisor: id })
            .sort({ status: 1 })
            .limit(limit > 0 ? limit : undefined);
    }

    async findAll(limit) {
        return Appointment.find().sort({ status: 1 })
            .limit(limit > 0 ? limit : undefined)
    }

}


