import express from "express";
import { mdValidate } from "../middlewares/validate.js";
import { mdAuth } from "../middlewares/authenticated.js";
import { orderController } from "../modules/orderService/infrastructure/web/orderController.js";


const api = express.Router();

api.post("/service-order", [mdAuth.asureAuth, mdValidate.parseDateMiddleware], orderController.save);
api.get("/services/orders/supervisor/:id_supervisor", [mdAuth.asureAuth], orderController.findAllByIdSupervisor);
api.get("/services/orders/in-progress/supervisor/:id_supervisor", [mdAuth.asureAuth], orderController.findAllByInProgressAndSupervisor);
api.get("/services/orders/customer/:id_customer", [mdAuth.asureAuth], orderController.findAllByIdCustomer);
api.get("/services/orders/employee/:id_employee", [mdAuth.asureAuth], orderController.findAllServicesByEmployeeId);
api.get("/services/orders/all/:status", [mdAuth.asureAuth], orderController.findAllByStatus);
api.get("/services/orders/manager/all", [mdAuth.asureAuth], orderController.findAllByManager);
api.get("/services/orders/workflow", [mdAuth.asureAuth], orderController.findAllByInProgress);
api.get("/services/orders/all/:limit?", [mdAuth.asureAuth], orderController.findAll);
api.put("/services", [mdAuth.asureAuth], orderController.assignServiceOrder);
api.put("/service-order", [mdAuth.asureAuth], orderController.updateStatus);
api.put("/service-order/update", [mdAuth.asureAuth], orderController.update);
api.get("/services/order/:id", [mdAuth.asureAuth, mdValidate.parseDateMiddleware], orderController.findOneById);


export const orderRoutes = api;