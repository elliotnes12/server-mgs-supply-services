import { EmployeeRepository } from "../../../domain/ports/employeeRepository.js";
import { Employee } from "./entities/employee.js";


export class MongoEmployeeRepository extends EmployeeRepository {

    async save(dataEmployee){

        const employee = new Employee(dataEmployee);
        return employee.save();
    }

    async findAll(){
        return await Employee.find();    
    }
    
    async find(filter){
        return await Employee.find(filter);    
    }

    async findEmployeeById(idEmployee) {
        return await Employee.findOne({ idEmployee: idEmployee });
    }


}


