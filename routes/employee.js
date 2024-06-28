import express from "express";
import { employeeController } from "../modules/employee/infrastructure/web/employeeController.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

api.post("/employee",[mdAuth.asureAuth],employeeController.createEmployee);
api.get("/employees",[mdAuth.asureAuth],employeeController.findAll);
api.get("/employees-by-users",[mdAuth.asureAuth],employeeController.findAllByUser);

export const employeeRoutes = api;