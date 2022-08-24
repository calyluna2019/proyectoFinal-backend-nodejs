require('dotenv').config();

async function getInfo(req, res) {
    //
    res.status(200).json({
        puerto: 8080,
        url_DB: process.env.MONGO_URI,
        credentials_ethereal_email: {
            user: process.env.SMTP_USERNAME,
            password: process.env.SMTP_PASSWORD
        },
        session_expire: "10 minutos",
        credentials_userAdmin: {
            user: process.env.USER_ADMIN,
            password: process.env.PASSWORD_ADMIN
        },
        roles: [
            "ADMIN",
            "CLIENTE"
        ]
    })
}

module.exports = {
    getInfo
}