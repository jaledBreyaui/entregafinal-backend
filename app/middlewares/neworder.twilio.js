const twilio = require('twilio')
require('dotenv').config()




const sendSms = () => {
    const client = twilio(process.env.SID, process.env.TOKEN)

        ; (async () => {

            try {
                const message = await client.messages.create({
                    body: 'Nueva compra registrada',
                    from: '+14307585293',
                    to: '+5491134921908'
                })

            } catch (error) {
                console.log(error);
            }
        })()
}
module.exports = sendSms