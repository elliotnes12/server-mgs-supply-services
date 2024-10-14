


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

            const customer = await this.repositories.customerRepository.findByName(name, page, limit);

            if (customer == undefined || customer.length == 0) {
                throw new Error("customers not found");
            }
            return {
                meta: { code: 200, module: "CUSTOMER", message: "success" },
                data: customer
            };
        }
        catch (error) {

            return { meta: { code: 404, module: "CUSTOMER", message: error.message } };
        }
    }

    async findByEmail(email) {

        try {

            const customer = await this.repositories.customerRepository.findByEmail(email);
            console.log(customer)
            if (customer == null) {
                throw new Error("customer not found");
            }
            return {
                meta: { code: 200, module: "CUSTOMER", message: "success" },
                data: customer
            };
        }
        catch (error) {

            return { meta: { code: 404, module: "CUSTOMER", message: error.message } };
        }
    }

    async findByBusinessName(businessName) {

        try{

            const customer = await this.repositories.customerRepository.findByBusinessName(businessName);


            if (customer == undefined || customer.length == 0) {
                throw new Error("customers not found");
            }
            return {
                meta: { code: 200, module: "CUSTOMER", message: "success" },
                data: customer
            };
        }
        catch(error){

            return { meta: { code: 404, module: "CUSTOMER", message: error.message } };
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