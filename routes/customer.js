import express from "express";
import { mdAuth } from "../middlewares/authenticated.js";
import { customerController } from "../modules/customer/infrastructure/web/customerController.js";

const api = express.Router();

api.post("/customer",[mdAuth.asureAuth],customerController.createCustomer);

api.get("/customer",[mdAuth.asureAuth],customerController.findAll);

api.post("/customer/find-by-business", [mdAuth.asureAuth], customerController.findByBusinessName);

api.post("/customer/find-by-name", [mdAuth.asureAuth], customerController.findByName);

api.post("/customer/find-by-email", [mdAuth.asureAuth], customerController.findByEmail);


export const customerRoutes = api;