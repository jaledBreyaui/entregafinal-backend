const nodemailer = require('nodemailer');
require('dotenv').config()



const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: process.env.ADMIN_MAIL,
        pass: 'xoogcrpulqmsrbcw'
    }
});

const sendMail = (user) => {

    const mailOptions = {
        from: 'Servidor de Jaled!',
        to: process.env.ADMIN_MAIL,
        subject: "Nuevo usuario registrado!",
        html: `<div> <h1>Datos del nuevo usuario</h1>
        <h3>${user.nombre} ${user.apellido}</h3>
        <h3>${user.telefono}</h3>
        <h3>${user.direccion}</h3>
    </div>`,
        attachments: [
            {
                path: 'https://admin2.cahuracan.com/new/wp-content/uploads/2021/01/el_palacio_1-2.jpg'
                // // notar que es el image adress//
            }
        ]
    }


        ; (async () => {
            try {
                const info = await transporter.sendMail(mailOptions)
            } catch (error) {
                console.log(error);
            }
        })()
}

module.exports = sendMail 
