import express from "express";
import { employeeController } from "../modules/employee/infrastructure/web/employeeController.js";
import { mdAuth } from "../middlewares/index.js";

const api = express.Router();

api.post("/employee", [mdAuth.asureAuth], employeeController.createEmployee);
api.get("/employees", [mdAuth.asureAuth], employeeController.findAll);
api.get("/employees-by-users",[mdAuth.asureAuth],employeeController.findAllByUser);
api.get("/employees/:type", [mdAuth.asureAuth], employeeController.findAllEmployees);
api.get("/employee-by-id/:id_employee/:type", [mdAuth.asureAuth], employeeController.findEmployeeById);
api.post("/employees-by-name", [mdAuth.asureAuth], employeeController.findEmployeesByName);

export const employeeRoutes = api;