import Mailgen from "mailgen";
import nodemailer from "nodemailer";

const sendemail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product: {
            name: "Task Manager",
            link: "https://helllo.com"
        }
    });

    const emailHtml = mailGenerator.generate(options.mailgenContent);
    const emailText = mailGenerator.generatePlaintext(options.mailgenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS,
        }
    });

    const mail = {
        from: "rajtiwari@gmail.com",
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHtml,
    };

    try {
        await transporter.sendMail(mail);
    } catch (error) {
        console.error("Email service failed. Check credentials.");
        console.error(error);
        throw new Error("Email could not be sent");
    }
};

const emailverificationmailgencontent = (username, verificationurl) => ({
    body: {
        name: username,
        intro: "Welcome to my app! We are excited to have you.",
        action: {
            instructions: "To verify your email please click the button below",
            button: {
               color: "#ff0000",
                text: "Verify your email",
                link: verificationurl,
            },
        },
        outro: "Need help or have questions? We are eager to help you."
    }
});

const forgetpasswordmailgencontent = (username, passwordverificationurl) => ({
    body: {
        name: username,
        intro: "Welcome to my app! We are excited to have you.",
        action: {
            instructions: "To change your password please click the button below",
            button: {
               color: "#1a73e8",
                text: "Change your password",
                link: passwordverificationurl,
            },
        },
        outro: "Need help or have questions? We are eager to help you."
    }
});

export { emailverificationmailgencontent, forgetpasswordmailgencontent, sendemail };
