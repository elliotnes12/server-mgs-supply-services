import mongoose from "mongoose";
import {DB_HOST,DB_USER,DB_PASS, IP_SERVER, PORT} from "./constants.js";

export function connectDB(socket){

    let URL = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/`;

    mongoose.connect(URL).
    then((success) =>{

        console.log("#########################");
        console.log("######### API ###########");
        console.log(`http://${IP_SERVER}/:${PORT}/api`);

        socket();
    }).catch((error) =>{
         throw error;
    });

}