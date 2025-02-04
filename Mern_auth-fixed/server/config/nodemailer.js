import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create a transporter object using SMTP settings
const transporter = nodemailer.createTransport({
    host: 'smtp-relay.brevo.com',
    port: 587,
    secure: false, // use TLS
    auth: {
        user: process.env.SMTP_USER,  // The SMTP user from .env file
        pass: process.env.SMTP_PASS,  // The SMTP password from .env file
    },
});

// Export the transporter for use in other modules
export default transporter;
