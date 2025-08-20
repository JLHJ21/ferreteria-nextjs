
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import { confirmationTemplate } from "./confirmation";
import { codeTemplate } from "./code";

type propsMail = {
    to: string,
    name: string,
    subject: string,
    body: string
};

export const sendMail = async (props: propsMail) => {
    const { SMTP_PASSWORD, SMTP_EMAIL } = process.env;

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        },
    });

    try {
        await transport.verify();
    } catch (error) {
        console.log(error);
        return;
    }

    try {
        await transport.sendMail({
            from: SMTP_EMAIL,
            to: props.to,
            subject: props.subject,
            html: props.body,
        });
    } catch (error) {
        console.log(error + " 33");
    }
};

export const compileConfirmationTemplate = (name: string, url: string, email: string) => {
    const template = handlebars.compile(confirmationTemplate);
    const htmlBody = template({
        name: name,
        url: url,
        email: email
    });

    return htmlBody;
};


export const compileCodeTemplate = (name: string, code: number, email: string) => {
    const template = handlebars.compile(codeTemplate);
    const htmlBody = template({
        name: name,
        code: code,
        email: email
    });

    return htmlBody;
};