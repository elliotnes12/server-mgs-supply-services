


export class CustomerService {

    constructor(repositories) {
        this.repositories = repositories;
    }

    async findAll(){

        try{

            const employees = await this.repositories.customerRepository.findAll();

            return {
                meta: { code: 200, module: "CUSTOMER", message: "success" },
                data: employees 
            };
        }
        catch(error){

            return { meta: { code: 400, module: "CUSTOMER", message: "Error" } };
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