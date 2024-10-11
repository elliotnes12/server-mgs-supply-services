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

    async findAllEmployees() {
        return await Employee.find({
            type: 'employee'
        })
    }

    async findEmployeeByName(name) {
        return await Employee.find({
            name: { $regex: new RegExp(name, 'i') }
        });
    }

    async findEmployeeById(idEmployee) {
        return await Employee.findOne({ idEmployee: idEmployee });
    }


}


