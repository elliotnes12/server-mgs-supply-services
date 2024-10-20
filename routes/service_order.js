import express from "express";
import { mdValidate } from "../middlewares/validate.js";
import { mdAuth } from "../middlewares/authenticated.js";
import { orderController } from "../modules/orderService/infrastructure/web/orderController.js";

const api = express.Router();

api.post("/service-order", [mdAuth.asureAuth, mdValidate.parseDateMiddleware], orderController.save);
api.get("/services/orders/in-progress/supervisor/:id_supervisor", [mdAuth.asureAuth], orderController.findAllByInProgressAndSupervisor);
api.get("/services/orders/in-progress/employee/:id_employee", [mdAuth.asureAuth], orderController.findAllByInProgressAndEmployee);
api.get("/services/orders/customer/:id_customer", [mdAuth.asureAuth], orderController.findAllByIdCustomer);
api.get("/services/orders/employee/:id_employee", [mdAuth.asureAuth], orderController.findAllServicesByEmployeeId);
api.get("/services/orders/supervisor/:id_supervisor", [mdAuth.asureAuth], orderController.findAllByIdSupervisor);
api.get("/services/orders/manager", [mdAuth.asureAuth], orderController.findAllByManager);
api.get("/services/orders/workflow", [mdAuth.asureAuth], orderController.findAllByInProgress);
api.put("/services", [mdAuth.asureAuth], orderController.assignServiceOrder);
api.put("/service-order", [mdAuth.asureAuth], orderController.updateStatus);
api.put("/service-order/update", [mdAuth.asureAuth], orderController.update);
api.get("/services/order/:id", [mdAuth.asureAuth, mdValidate.parseDateMiddleware], orderController.findOneById);
api.post("/service/order/complete", [mdAuth.asureAuth, mdAuth.upload.array('images', 10)], orderController.completeService);
api.get("/services/orders/supervisor/:id_supervisor/:id_ticket", [mdAuth.asureAuth], orderController.findServiceBySupervisorAndTicket);
api.get("/services/orders/customer/:id_customer/:id_ticket", [mdAuth.asureAuth], orderController.findServiceByCustomerAndTicket);
api.get("/services/orders/employee/:id_employee/:id_ticket", [mdAuth.asureAuth], orderController.findServiceByEmployeeAndTicket);
api.get("/services/orders/ticket/:id_ticket", [mdAuth.asureAuth], orderController.findServiceByTicket);
api.get("/services/orders/total/:year", [mdAuth.asureAuth], orderController.findAllTotalServicesByYear);
api.get("/services/orders/total-by-month", [mdAuth.asureAuth], orderController.findAllTotalServicesByMonth);


export const orderRoutes = api;