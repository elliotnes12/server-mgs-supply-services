import express from "express";
import { customerController  } from "../controllers/index.js";
import { mdAuth } from "../middlewares/authenticated.js";

const api = express.Router();

api.post("/customer",[mdAuth.asureAuth],customerController.createCustomer);

export const customerRoutes = api;