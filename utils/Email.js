import { createTransport } from "nodemailer";
import { CONFIG_EMAIL } from "../utils/constants.js";
import { ETQ_LOG } from "../utils/constants.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const sendEmail = async (email, code) => {

    try {

        const transport = createTransport(CONFIG_EMAIL.transport);

        const __filename = fileURLToPath(import.meta.url);

        const __dirname = path.dirname(__filename);

        const templatePath = path.join(__dirname, '..', 'templates', 'email.html');

        const template = fs.readFileSync(templatePath, 'utf8');

        const htmlContent = template.replace('{{CODE}}', code);

        await transport.sendMail({
            from: CONFIG_EMAIL.from,
            to: email,
            subject: CONFIG_EMAIL.subject.newUser,
            html: htmlContent
        });

        console.log(ETQ_LOG, "sendEmail", "Success send email " + email);

    } catch (error) {

        console.log(ETQ_LOG, "sendEmail", error);

    }

}

export const emailController = {
    sendEmail
}