import express from "express";
import http from "http";
import { initSocketServer } from "./utils/index.js";
import cors from 'cors';
import morgan from 'morgan';
import {authRoutes, chatGroupRoutes, chatMessageRoutes, chatRoutes, employeeRoutes, permissionRoutes, userRoutes}  from './routes/index.js';
import  swaggerUI  from "swagger-ui-express";
import  swaggerJsdoc    from "swagger-jsdoc";
import { SWAGGER_SPEC } from "./utils/constants.js";
import { companyRoutes } from "./routes/company.js";
import { customerRoutes } from "./routes/customer.js";
import { roleRoutes } from "./routes/role.js";
import { orderRoutes } from "./routes/service_order.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

const app = express();
const server = http.createServer(app);
initSocketServer(server);


app.use(express.json());

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));

// Configure Header Http - CORS
app.use(cors());

// Configure logger HTTP request
app.use(morgan("dev"));

//Configure routes


app.use("/api",authRoutes);

app.use("/api",userRoutes);

app.use("/api",chatRoutes);

app.use("/api",chatMessageRoutes);

app.use("/api",chatGroupRoutes);

app.use("/api",roleRoutes);

app.use("/api",permissionRoutes);

app.use("/api",employeeRoutes);

app.use("/api",companyRoutes);

app.use("/api",customerRoutes);

app.use("/api",orderRoutes);

//Swagger
app.use("/api-doc",swaggerUI.serve,swaggerUI.setup(swaggerJsdoc(SWAGGER_SPEC)));


//Cloudinary

cloudinary.config({
    cloud_name: 'dlbyt2oob',
    api_key: '693789867285246',
    api_secret: 'Vt6T0jjVnI81jUGYBkbFDS6Hqa8'
})

dotenv.config();

export { server };
