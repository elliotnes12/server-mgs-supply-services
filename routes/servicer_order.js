
import express from "express";
import { mdAuth } from "../middlewares/authenticated.js";
import { serviceOrderController } from "../controllers/service_order.js";


const api = express.Router();

api.get("/serviceOrder",[mdAuth.asureAuth],serviceOrderController.addServiceOrder);

export const roleRoutes = api;