import { createTransport } from "nodemailer";
import { CONFIG_EMAIL } from "../utils/constants.js";
import { ETQ_LOG } from "../utils/constants.js";


const sendEmail = async (email,code) => {

    try {

        const transport = createTransport(CONFIG_EMAIL.transport);

        await transport.sendMail({
            from: CONFIG_EMAIL.from,
            to: email,
            subject: CONFIG_EMAIL.subject.newUser,
            html: "<p> Correo de prueba para activación </p><p>"+code+"</p>"
        });

        console.log(ETQ_LOG,"sendEmail","Success send email "+email);

    } catch (error) {

        console.log(ETQ_LOG,"sendEmail",error);

    }

}

export const emailController = {
    sendEmail
}