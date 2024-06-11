import express from "express";
import { mdValidate } from "../middlewares/validate.js";
import { mdAuth } from "../middlewares/authenticated.js";
import { orderController } from "../modules/orderService/infrastructure/web/orderController.js";


const api = express.Router();

api.post("/service-order",[mdAuth.asureAuth,mdValidate.parseDateMiddleware],orderController.save);
api.get("/service-order/supervisor/:id",[mdAuth.asureAuth],orderController.findAllBySupervisor);
api.put("/service-order",[mdAuth.asureAuth],orderController.assignServiceOrder);



export const orderRoutes = api;