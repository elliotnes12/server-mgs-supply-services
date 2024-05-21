import express from "express";
import {  companyController } from "../controllers/index.js";

const api = express.Router();

api.post("/company",companyController.addCompany);
api.get("/companies",companyController.getAllCompanies);

export const companyRoutes = api;