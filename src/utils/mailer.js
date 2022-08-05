require('dotenv').config();
const { createTransport } = require('nodemailer');

const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
});

const sendMailer = async (to,subject,html) => {
    try {
        const mailOptions = {
            to,
            subject,
            html
        }
        await transporter.sendMail(mailOptions)
    } catch (error) {
        // logger.error(error.message)
    }
}

const enviarEmail = async (type, subject, data) => {
    let templateFile;
    try {
        if (type === 'nuevoUsuario') {
            templateFile = `
                <p><strong>Los datos del nuevo usuario son los siguientes:</strong></p>
                <p><strong>Nombre:</strong>${data.nombre}</p><p><strong>Dirección:</strong>${data.direccion}</p>
                <p><strong>Email:</strong>${data.email}</p><p><strong>Teléfono:</strong>${data.telefono}</p>
                <p><strong>Edad:</strong>${data.edad}</p>
                `;
        }

        await sendMailer(process.env.ADMIN_EMAIL, subject, templateFile);
    } catch (error) {
        // logger.error(error.message)
    }
}

module.exports = {
    enviarEmail
};