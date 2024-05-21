
import { Company } from "../models/index.js";

async function addCompany(req, resp) {

    try {

        const company = new Company(req.body);

        await company.save();

        return resp.status(201).send();

    } catch (error) {

       return resp.status(400).send({ module: "COMPANY", msg: "Error create company" });

    }

}


/**
 * 
 * Obtiene todas las companias
 * 
 * @method getAllCompanies
 * @param {*} req 
 * @param {*} resp 
 */
async function getAllCompanies(req, resp) {

    try {
        const companies = await Company.find();

        if (!companies) {
            return resp.status(404).send({ module: "COMPANY", message: "No active companies found" });
        }

        return resp.status(200).send(companies);
    } catch (e) {
        return resp.status(500).send({ module: "COMPANY", message: "error get companies" });
    }


}



export const companyController = {
    addCompany,
    getAllCompanies
}