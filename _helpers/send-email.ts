const nodemailer = require('nodemailer');





async function sendEmail({ to , subject, html }:{to:string, subject: string, html:string }) {
    const _smtpOptions   = {'host': process.env.SMTP_HOST, 'port' : parseInt(process.env.SMTP_PORT? process.env.SMTP_PORT : "0")}
    const transporter = nodemailer.createTransport(_smtpOptions); 
   
    await transporter.sendMail({ from : process.env.EMAIL_FROM, to, subject, html });
}

export default sendEmail;