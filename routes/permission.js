import express from "express";
import { mdAuth } from "../middlewares/authenticated.js";
import { permissionController } from "../modules/permission/infrastructure/web/permissionController.js";


const api = express.Router();

api.get("/permissions",[mdAuth.asureAuth],permissionController.findAll);

api.post("/permission",[mdAuth.asureAuth],permissionController.createPermission);

export const permissionRoutes = api;