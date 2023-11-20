const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

const getEmail = async (option) => {
    try {
        // Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.SENDER_EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        // Email option
        const emailOption = {
            from: option.from, 
            to: process.env.SENDER_EMAIL,
            subject: 'CinoHolic issue mail',
            text: option.bodyMsg,
        }

        await transporter.sendMail(emailOption);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('An error occurred while sending the email:', error);
    }
}

module.exports = getEmail;