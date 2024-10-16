import { CustomerRepository } from "../../../domain/ports/customerRepository.js";
import { Customer } from "./entities/Customer.js";


export class MongoCustomerRepository extends CustomerRepository {

    async save(dataCustomer) {

        const customer = new Customer(dataCustomer);
        return customer.save();
    }

    async findAll(page = 1, limit = 20) {

        const skip = (page - 1) * limit;
        return await Customer.find().skip(skip).limit(limit)
            .populate('user', '-password -active -validationCode -validationCodeExpires');
    }

    async findByBusinessName(businessName) {

        return await Customer.find({
            businessName: { $regex: new RegExp(businessName, "i") }
        }).populate("user", "-password -active -validationCode -validationCodeExpires -role -__v");
    }

    async findByName(name, page = 1, limit = 20) {

        const skip = (page - 1) * limit;
        return await Customer.find({
            name: { $regex: new RegExp(name, 'i') }
        }).
            populate("user", "-password -active -validationCode -validationCodeExpires -role -__v").
            skip(skip).limit(limit);
    }

    async findByEmail(email) {

        const customer = await Customer.findOne().populate({
            path: "user",
            select: "-password -active -validationCode -validationCodeExpires -role -__v",
            match: { email: email }
        });

        if (!customer || !customer.user) {
            return null;
        }

        return customer;
    }


}


