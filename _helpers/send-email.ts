const nodemailer = require('nodemailer');





async function sendEmail({ to, subject, html, from = process.env.EMAIL_FROM }) {
    const _smtpOptions   = {'host': process.env.SMTP_HOST, 'port' : parseInt(process.env.SMTP_PORT)}
    const transporter = nodemailer.createTransport(_smtpOptions); 
   
    await transporter.sendMail({ from, to, subject, html });
}

export default sendEmail;