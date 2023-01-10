const connection = require('../../config/mongoConnect')
const Msj = require('../models/messages.model')

class Chatcontainer {
    constructor() {
        connection()
    }

    async getAll() {
        try {
            const messages = await Msj.find({})
            return messages
        } catch (error) {
            return error
        }
    }


    async getChat(email) {
        try {
            const messages = await Msj.find({ 'userEmail': email })
            return messages
        } catch (error) {
            return error
        }
    }

    async postMsj({ userEmail, message }) {
        try {
            const newMessage = await new Msj({ userEmail, message })
            console.log(newMessage)
            await newMessage.save()
            return { newMessage, msj: 'Ok!' }
        } catch (error) {
            return error
        }
    }
}

module.exports = { Chatcontainer }