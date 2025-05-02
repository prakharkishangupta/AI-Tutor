import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,       // Port for TLS (Transport Layer Security) is more secure and the successor to SSL (Secure Sockets Layer, port 465)
    secure: false,    // implies to use TLS and if false means to use SSL
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

const sendWelcomeEmail = async (userEmail, userName) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: 'Welcome to MemoPack!',
            html: `
                <h1>Welcome to MemoPack, ${userName}!</h1>
                <p>Thank you for joining our platform. We're excited to have you on board!</p>
                <p>Start exploring our features and enhance your learning journey.</p>
            `
        };
        console.log("transporter", typeof transporter);
        const info = await transporter.sendMail(mailOptions);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email Service Error:', error);
        return { success: false, error: error.message };
    }
};

export default { sendWelcomeEmail };
