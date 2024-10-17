import { ServiceOrder } from "../../application/serviceOrder.js";
import { MongoServiceRepository } from "../databases/mongodb/mongoServiceRepository.js";
import { v2 as cloudinary } from 'cloudinary';


const repositories = {
    orderRepository: new MongoServiceRepository(),
}


const serviceOrder = new ServiceOrder(repositories);


const findAllByIdSupervisor = async (req, resp) => {

    try{

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const { id_supervisor } = req.params;

        const response = await serviceOrder.findAllByIdSupervisor(page, limit, id_supervisor);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
      }
}

const findAllServicesByEmployeeId = async (req, resp) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const { id_employee } = req.params;

        const response = await serviceOrder.findAllServicesByEmployeeId(page, limit, id_employee);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}

const findAllByIdCustomer = async (req, resp) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const { id_customer } = req.params;

        const response = await serviceOrder.findAllByIdCustomer(page, limit, id_customer);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}

const findServiceByCustomerAndTicket = async (req, resp) => {

    try {

        const { id_customer, id_ticket } = req.params;

        const response = await serviceOrder.findServiceByIdCustomerAndTicket(id_customer, id_ticket);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}

const findServiceBySupervisorAndTicket = async (req, resp) => {

    try {

        const { id_supervisor, id_ticket } = req.params;

        const response = await serviceOrder.findServiceByIdSupervisorAndTicket(id_supervisor, id_ticket);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}

const findServiceByEmployeeAndTicket = async (req, resp) => {

    try {

        const { id_employee, id_ticket } = req.params;

        const response = await serviceOrder.findServiceByIdEmployeeAndTicket(id_employee, id_ticket);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}

const findServiceByTicket = async (req, resp) => {

    try {

        const { id_ticket } = req.params;

        console.log(id_ticket)

        const response = await serviceOrder.findServiceByTicket(id_ticket);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}


const findAllByManager = async (req, resp) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;


        const response = await serviceOrder.findAllByManager(page, limit);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}

const findOneById = async (req, resp) => {

    try {


        const { id } = req.params;

        const response = await serviceOrder.findOneById(id);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        console.log(error)
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}



const findAllByInProgress = async (req, resp) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const response = await serviceOrder.findAllByInProgress(page, limit);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}


const findAllByInProgressAndSupervisor = async (req, resp) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const { id_supervisor } = req.params;

        const response = await serviceOrder.findAllByInProgressAndSupervisor(page, limit, id_supervisor);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}


const findAllByInProgressAndEmployee = async (req, resp) => {

    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const { id_employee } = req.params;

        const response = await serviceOrder.findAllServicesByInProgressAndEmployeeId(page, limit, id_employee);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        console.log(error)
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}

const assignServiceOrder = async (req,resp) =>{

    try{

        const { id, employees } = req.body;
        const response = await serviceOrder.assignServiceOrder(id,employees);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
      }
}

const save = async (req,resp) =>{

    try{

        const { user_id } = req.user;
        const response = await serviceOrder.save(user_id,req.body);
  
        return resp.status(response.meta.code).send(response);
  
      }
      catch(error){
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}

const update = async (req, resp) => {

    try {

        const response = await serviceOrder.update(req.body);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}

const updateStatus = async (req, resp) => {

    try {

        const { status, id } = req.body;
        const response = await serviceOrder.updateStatus(id, status);

        return resp.status(response.meta.code).send(response);

    }
    catch (error) {
        return resp.status(400).send({ meta: { code: 400, message: error.message, module: "SERVICE_ORDER" } });
    }
}


const completeService = async (req, resp) => {
    try {

        const { id, status } = req.body;

        if (!req.files || req.files.length === 0) {
            return resp.status(400).send({
                meta: { code: 400, message: "No images uploaded", module: "SERVICE_ORDER" }
            });
        }

        const imageUploadPromises = req.files.map(async (file) => {
            try {
                const uploadResult = await cloudinary.uploader.upload(file.path, {
                    folder: 'uploads',
                    public_id: file.originalname.split('.')[0],
                    resource_type: 'image'
                });
                return uploadResult.secure_url;
            } catch (error) {
                throw new Error(`Error uploading image: ${file.originalname}`);
            }
        });

        const imageUrls = await Promise.all(imageUploadPromises);

        const body = {
            photos: imageUrls,
            id: id,
            status: status
        };

        const response = await serviceOrder.update(body);

        return resp.status(response.meta.code).send(response);


    } catch (error) {
        return resp.status(500).send({
            meta: { code: 500, message: "Error uploading images", module: "SERVICE_ORDER" }
        });
    }
};


export const orderController = {
    save,
    findAllByIdSupervisor,
    findAllByIdCustomer,
    findAllByInProgress,
    findAllByInProgressAndSupervisor,
    assignServiceOrder,
    updateStatus,
    update,
    findAllByManager,
    findOneById,
    findAllServicesByEmployeeId,
    findAllByInProgressAndEmployee,
    completeService,
    findServiceByCustomerAndTicket,
    findServiceBySupervisorAndTicket,
    findServiceByEmployeeAndTicket,
    findServiceByTicket
}