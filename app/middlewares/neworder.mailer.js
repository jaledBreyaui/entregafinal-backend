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

const newOrderMail = (user, productos) => {

    const mailOptions = {
        from: 'Servidor de Jaled!',
        to: process.env.ADMIN_MAIL,
        subject: "Nueva compra!",
        html: `<div> <h1>Datos del usuario</h1>
        <h3>${user.nombre} ${user.apellido}</h3>
        <h3>${user.telefono}</h3>
        <h3>${user.direccion}</h3>
        <h1>Productos</h1>
        ${productos}
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

module.exports = newOrderMail 