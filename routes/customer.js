import express from "express";
import { mdAuth } from "../middlewares/authenticated.js";
import { customerController } from "../modules/customer/infrastructure/web/customerController.js";

const api = express.Router();

api.post("/customer",[mdAuth.asureAuth],customerController.createCustomer);

api.get("/customer",[mdAuth.asureAuth],customerController.findAll);

export const customerRoutes = api;