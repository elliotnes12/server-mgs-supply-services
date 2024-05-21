import express from "express";
import { mdAuth } from "../middlewares/authenticated.js";
import { roleController } from "../modules/role/infrastructure/web/roleController.js";


const api = express.Router();

api.get("/roles",[mdAuth.asureAuth],roleController.findAll);

api.post("/role",[mdAuth.asureAuth],roleController.createRole);

export const roleRoutes = api;

