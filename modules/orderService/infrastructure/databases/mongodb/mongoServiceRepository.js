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

    async findServiceByIdCustomerAndTicket(id_customer, ticket) {

        return Appointment.findOne({ customer: id_customer, ticket: ticket });
    }

    async findServiceByTicket(ticket) {
        return Appointment.findOne({ ticket: ticket })
            .populate("customer");
    }

    async findServicesByIdSupervisorAndTicket(id_supervisor, ticket) {

        return Appointment.findOne({ supervisor: id_supervisor, ticket: ticket })
            .populate("customer");
    }

    async findAllServicesByIdEmployeeAndTicket(employeeId, ticket) {
        const skip = (page - 1) * limit;

        return Appointment.findOne({ employees: employeeId, ticket })
            .populate("customer")
            .populate("employees", "-active -user -type -__v")
            .populate("supervisor", "-active -user -type -__v");
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

    async getServicesByYear(year) {
        const startDate = new Date(`${year}-01-01T00:00:00Z`); // Inicio del año
        const endDate = new Date(`${year}-12-31T00:00:00Z`); // Inicio del siguiente año

        console.log(`Consultando servicios para el año: ${year}`);

        const statuses = ['in_progress', 'cancelled', 'completed'];

        const result = await Appointment.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: startDate,
                        $lt: endDate, // Asegúrate de que esto sea menor que el siguiente año
                    },
                    status: { $in: statuses },
                },
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        status: "$status",
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $sort: { "_id.month": 1 },
            },
        ]);

        console.log("Resultados de la consulta:", result); // Verifica los resultados

        // Inicializa los arrays para los datos
        const inProgressData = Array(12).fill(0);
        const cancelledData = Array(12).fill(0);
        const completedData = Array(12).fill(0);

        // Asigna los valores a los meses correspondientes
        result.forEach((item) => {
            const monthIndex = item._id.month - 1; // Meses de 0 a 11
            const status = item._id.status;

            if (status === 'in_progress') {
                inProgressData[monthIndex] = item.count;
            } else if (status === 'cancelled') {
                cancelledData[monthIndex] = item.count;
            } else if (status === 'completed') {
                completedData[monthIndex] = item.count;
            }
        });

        return {
            in_progress: inProgressData,
            cancelled: cancelledData,
            completed: completedData,
        };
    }

}


