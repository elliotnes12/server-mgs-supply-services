import { CustomerRepository } from "../../../domain/ports/customerRepository.js";
import { Customer } from "./entities/Customer.js";


export class MongoCustomerRepository extends CustomerRepository {

    async save(dataCustomer){

        const customer = new Customer(dataCustomer);
        return customer.save();
    }

    async findAll(){
        return await Customer.find();    
    }


}


