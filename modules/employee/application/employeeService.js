


export class EmployeeService {

    constructor(repositories) {
        this.repositories = repositories;
    }

    async findAll(){

        try{

            const employees = await this.repositories.employeeRepository.findAll();

            return {
                meta: { code: 200, module: "EMPLOYEE", message: "success" },
                data: employees 
            };
        }
        catch(error){

            return { meta: { code: 400, module: "EMPLOYEE", message: "Error" } };
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