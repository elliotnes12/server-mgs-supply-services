import express from "express";
import { mdValidate } from "../middlewares/validate.js";
import { mdAuth } from "../middlewares/authenticated.js";
import { orderController } from "../modules/orderService/infrastructure/web/orderController.js";


const api = express.Router();

api.post("/services", [mdAuth.asureAuth, mdValidate.parseDateMiddleware], orderController.save);
api.get("/services/orders/supervisor/:limit?", [mdAuth.asureAuth], orderController.findAllByIdSupervisor);
api.get("/services/orders/all/:limit?", [mdAuth.asureAuth], orderController.findAll);
api.put("/services", [mdAuth.asureAuth], orderController.assignServiceOrder);



export const orderRoutes = api;