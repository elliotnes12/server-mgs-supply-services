import { EmployeeService } from "../../application/employeeService.js";
import { MongoEmployeeRepository } from "../databases/mongodb/mongoEmployeeRepository.js";



const repositories = {
    employeeRepository: new MongoEmployeeRepository(),
}


const employeeService = new EmployeeService(repositories);



const findAll = async (req, resp) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const response = await employeeService.findAll(page, limit);
        return resp.status(response.meta.code).send(response);

    }
    catch (error) {

        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "EMPLOYEE" } });
    }
};

const findAllEmployees = async (req, resp) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const response = await employeeService.findAllEmployees(page, limit);
        return resp.status(response.meta.code).send(response);

    }
    catch (error) {

        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "EMPLOYEE" } });
    }
};

const findEmployeeById = async (req, resp) => {

    try {

        const { id_employee } = req.params;
        const response = await employeeService.findEmployeeById(id_employee);
        return resp.status(response.meta.code).send(response);

    }
    catch (error) {

        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "EMPLOYEE" } });
    }
};

const findAllByUser = async (req, resp) => {

    try {


        const { user_id } = req.user;

        const response = await employeeService.findAllByUser(user_id);
        return resp.status(response.meta.code).send(response);

    }
    catch (error) {

        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "EMPLOYEE" } });
    }
};


const findEmployeesByName = async (req, resp) => {

    try {

        const { name } = req.body;
        const response = await employeeService.findEmployeesByName(name);
        return resp.status(response.meta.code).send(response);

    }
    catch (error) {

        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "EMPLOYEE" } });
    }
};


const createEmployee = async (req, resp) => {

    try {

        const response = await employeeService.createEmployee(req.body);
        return resp.status(response.meta.code).send(response);

    }
    catch (error) {

        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "EMPLOYEE" } });
    }
};


export const employeeController = {
    createEmployee,
    findAll,
    findAllEmployees,
    findAllByUser,
    findEmployeeById,
    findEmployeesByName
}