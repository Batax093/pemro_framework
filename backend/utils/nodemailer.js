import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create a transporter with SMTP configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Function to send email
export const sendEmail = async (to, subject, text, html) => {
    if (!to) {
        console.error('No recipient defined');
        return;
    }
    
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text,
        html
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};
    