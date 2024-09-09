


export class CustomerService {

    constructor(repositories) {
        this.repositories = repositories;
    }

    async findAll(page, limit) {

        try {

            const employees = await this.repositories.customerRepository.findAll(page, limit);

            return {
                meta: { code: 200, module: "CUSTOMER", message: "success" },
                data: employees
            };
        }
        catch (error) {

            return { meta: { code: 400, module: "CUSTOMER", message: "Error" } };
        }
    }

    async findByName(name, page, limit) {

        try {

            const employee = await this.repositories.customerRepository.findByName(name, page, limit);

            if (employee == null || employee == undefined) {
                throw new Exception();
            }
            return {
                meta: { code: 200, module: "CUSTOMER", message: "success" },
                data: employee
            };
        }
        catch (error) {

            return { meta: { code: 404, module: "CUSTOMER", message: "The name does not exist" } };
        }
    }

    async findByBusinessName(businessName) {

        try{

            const employee = await this.repositories.customerRepository.findByBusinessName(businessName);

            if (employee == null || employee == undefined) {
                throw new Exception();
            }
            return {
                meta: { code: 200, module: "CUSTOMER", message: "success" },
                data: employee
            };
        }
        catch(error){

            return { meta: { code: 404, module: "CUSTOMER", message: "The businessName does not exist" } };
        }
    }





    async createCustomer(dataCustomer) {

        try {

            const customer = await this.repositories.customerRepository.save(dataCustomer);

            return {
                meta: { code: 200, module: "CUSTOMER", message: "success" },
                data: customer 
            };

        } catch (error) {
            return { meta: { code: 400, module: "CUSTOMER", message: "customer already registered" } };
        }
    }
}