import { Employee } from "../modules/employee/infrastructure/databases/mongodb/entities/employee.js";
import { Role } from "../core/infrastructure/databases/mongo/entities/role.js";
import { DATE_ZONE, ETQ_LOG } from "./constants.js";
import  crypto   from "crypto";
import moment from 'moment-timezone';



export function getFilePath(file) {
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

export async function getRoleByCustomer(type) {
    let idRole = undefined;

    try {

        const role = await Role.findOne({ name: type });
        console.log("getRoleByCustomer " + role._id)
        idRole = role._id;

    } catch (e) {
        console.log("fue error");
    }


    return idRole;
}


function getRandomInt(min, max) {
    return Math.floor(crypto.randomBytes(4).readUInt32BE(0) / 0xFFFFFFFF * (max - min + 1)) + min;
}

export function generateRandomNumbers(count) {
    const numbers = [];
    for (let i = 0; i < count; i++) {
        numbers.push(getRandomInt(0, 9)); 
    }
    return numbers;
}

export function getExpirationTime() {
       const date = moment().tz(DATE_ZONE);

       date.add(10, 'minutes');
   
       return date.format('YYYY-MM-DD HH:mm:ss'); 
}

export function isDateLessThanOrEqualToCurrent(dateString, timeZone) {

    const date = moment.tz(dateString, timeZone);
    const currentDate = moment().tz(timeZone);

    return date.isSameOrAfter(currentDate);
}
