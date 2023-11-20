const nodemailer = require('nodemailer');

const dotenv = require('dotenv');
dotenv.config({ path: './../config.env' });

const sendEmail = async (option) => {
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
            from: {
                name: "CinoHolic",
                address: process.env.SENDER_EMAIL,
            },
            to: option.to,
            subject: "OTP for Password Reset request",
            text: `Here is your OTP : ${option.pin}\n\nWARNING : PLEASE DO NOT SHARE THIS TO ANYONE!` ,
        }

        await transporter.sendMail(emailOption);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('An error occurred while sending the email:', error);
    }
}

module.exports = sendEmail;