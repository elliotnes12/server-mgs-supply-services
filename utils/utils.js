import { Employee } from "../modules/employee/infrastructure/databases/mongodb/entities/employee.js";
import { Role } from "../core/infrastructure/databases/mongo/entities/role.js";
import { ETQ_LOG } from "./constants.js";

export function getFilePath(file){
    const filePath = file.path;
    const fileSplit = filePath.split("/");

    return `${fileSplit[1]}/${fileSplit[2]}"`;
}

export async function getRoleByEmployee(idEmployee) {
    let idRole = undefined;
    try {
        const employee = await Employee.findOne({ idEmployee: idEmployee }); 
        if (!employee) {
            throw new Error('Employee not found'); 
        }

        const employeeType = employee.type;

        const role = await Role.findOne({ name: employeeType });

        idRole = role._id;

    } catch (error) {
        return idRole;
    }

    return idRole; 
}

export async function getRoleByCustomer(type){
    let idRole = undefined;

    try{

        const role = await Role.findOne({ name: type });
        console.log("getRoleByCustomer "+role._id)
        idRole = role._id;
        
    }catch(e){
        console.log("fue error");
    }

    
    return idRole;
}

export async function getBcryptPassword(password){

    
}