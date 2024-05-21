import { Customer } from "../models/index.js";



async function createCustomer(req, resp) {
    const { user_id } = req.user;
    const { name, lastName, telephone, company, otherCompany } = req.body;

    const session = await Customer.startSession();
    session.startTransaction();

    try {
        const customer = await Customer.findOne({ user: user_id }).session(session);

        if (customer) {
            await session.commitTransaction();
            session.endSession();
            return resp.status(200).send(customer);
        }

        const newCustomer = new Customer({
            user: user_id,
            name: name,
            lastName: lastName,
            telephone: telephone,
            company: company,
            otherCompany: otherCompany
        });

        await newCustomer.save({ session: session });

        await User.findByIdAndUpdate({ _id: user_id }, { active: true }, { session: session });

        await session.commitTransaction();
        session.endSession();

        return resp.status(201).send(newCustomer);

    } catch (error) {
        console.log(error);

        await session.abortTransaction();
        session.endSession();

        return resp.status(400).send({ module: "CUSTOMER", msg: "Error create customer" });
    }
}


export const customerController = {
   createCustomer
}