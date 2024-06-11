import { MongoEmployeeRepository } from "../../../../employee/infrastructure/databases/mongodb/mongoEmployeeRepository.js";
import { OrderRepository } from "../../../domain/ports/OrderRepository.js";
import { Appointment } from "./entities/appointment.js";

export class MongoOrderRepository extends OrderRepository {


    async save(order) {
       
        let supervisor = await this.findAvailableSupervisors();

        if (supervisor.length === 0) {
            supervisor = await this.findSupervisorWithLeastWork();
        } else {
            supervisor = supervisor[0];
        } 

        order.supervisor = supervisor?._id;

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

    async findByIdSupervisor(id){
        return Appointment.find({ supervisor: id }).sort({ status: 1 });
    }

    async findAvailableSupervisors() {

        const employeeRepository = new MongoEmployeeRepository();
        const supervisors = await employeeRepository.find({ type: 'supervisor' });

        const busySupervisors = await Appointment.find({
            $or:[{ status: 'pending' }, { status: 'in_process' }]
        }).distinct('supervisor');


        const availableSupervisors = supervisors.filter(supervisor => busySupervisors.includes(supervisor._id.toString()));

        return availableSupervisors;
    };

    async findSupervisorWithLeastWork() {


        const employeeRepository = new MongoEmployeeRepository();
        const supervisors = await employeeRepository.find({ type: 'supervisor' });
      
        const supervisorWorkloads = await Promise.all(
          supervisors.map(async supervisor => {
            const workload = await Appointment.countDocuments({ supervisor: supervisor._id });
            return { supervisor, workload };
          })
        );
      
        supervisorWorkloads.sort((a, b) => a.workload - b.workload);
      
        return supervisorWorkloads[0].supervisor;
      };





}


