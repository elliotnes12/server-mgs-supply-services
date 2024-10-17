import { EmployeeRepository } from "../../../domain/ports/employeeRepository.js";
import { Employee } from "./entities/employee.js";

export class MongoEmployeeRepository extends EmployeeRepository {

    async save(dataEmployee){

        const employee = new Employee(dataEmployee);
        return employee.save();
    }

    async findAll(page = 1, limit = 20) {
        const skip = (page - 1) * limit;
        return await Employee.find().skip(skip).limit(limit);
    }

    async findAllByUser(userId){
        return Employee.find({ 
            user: { $ne: null } 
        }).populate('user'); 
    }
    
    async find(filter){
        return await Employee.find(filter);    
    }

    async findAllEmployees(page = 1, limit = 20, type) {
        const skip = (page - 1) * limit;
        return await Employee.find({
            type: type,
            user: { $ne: null }
        }).skip(skip).limit(limit)
    }


    async findEmployeeByName(name, page = 1, limit = 20, type) {
        const skip = (page - 1) * limit;
        return await Employee.find({
            name: { $regex: new RegExp(name, 'i') },
            type: type,
            user: { $ne: null }
        }).skip(skip).limit(limit);
    }

    async findEmployeeById(idEmployee, type) {
        return await Employee.findOne({ idEmployee: idEmployee, type: type, user: { $ne: null } });
    }


}


