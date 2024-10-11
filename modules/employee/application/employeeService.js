


export class EmployeeService {

    constructor(repositories) {
        this.repositories = repositories;
    }


    async findAllByUser(userId){

        try{

            const employees = await this.repositories.employeeRepository.findAllByUser(userId);

            return {
                meta: { code: 200, module: "EMPLOYEE", message: "success" },
                data: employees 
            };
        }
        catch(error){

            return { meta: { code: 400, module: "EMPLOYEE", message: error.message } };
        }

    }

    async findEmployeeById(employeeId) {

        try {

            const employee = await this.repositories.employeeRepository.findEmployeeById(employeeId);

            if (employee == null) {
                throw new Error("Employee not found");
            }
            return {
                meta: { code: 200, module: "EMPLOYEE", message: "success" },
                data: employee
            };
        }
        catch (error) {
            return { meta: { code: 400, module: "EMPLOYEE", message: error.message } };
        }

    }
    async findAllEmployees(page, limit) {

        try{

            const employees = await this.repositories.employeeRepository.findAllEmployees(page, limit);

            return {
                meta: { code: 200, module: "EMPLOYEE", message: "success" },
                data: employees 
            };
        }
        catch(error){

            return { meta: { code: 400, module: "EMPLOYEE", message: error.message } };
        }
    }

    async findEmployeesByName(name) {
        try {

            const employee = await this.repositories.employeeRepository.findEmployeeByName(name);
            console.log(employee)
            if (employee == null || employee?.length == 0) {
                throw new Error("Employees not found");
            }
            return {
                meta: { code: 200, module: "EMPLOYEE", message: "success" },
                data: employee
            };
        }
        catch (error) {

            return { meta: { code: 400, module: "EMPLOYEE", message: error.message } };
        }
    }

    async createEmployee(dataEmployee) {

        try {

            const employee = await this.repositories.employeeRepository.save(dataEmployee);

            return {
                meta: { code: 200, module: "EMPLOYEE", message: "success" },
                data: employee 
            };

        } catch (error) {
            return { meta: { code: 400, module: "EMPLOYEE", message: "EmployeeError employee already registered" } };
        }
    }
}