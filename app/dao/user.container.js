const connection = require('../../config/mongoConnect')
const Users = require('../models/user.model')
const sendSms = require('../middlewares/neworder.twilio')
const newOrderMail = require('../middlewares/neworder.mailer')


class UserContainer {
    constructor() {
        connection()
    }
    //////User Func/////////////////////

    async getUsers() {
        try {
            const users = await Users.find({})
            return users
        } catch (error) {
            console.log(error);
        }
    }


    async getById(id) {
        try {
            const user = await Users.find({ "_id": id })
            return user
        } catch (error) {
            console.log(error);
        }
    }


    async getByEmail(email) {
        try {
            const user = await Users.find({ "email": email })
            return user
        } catch (error) {
            console.log(error);
        }
    }

    async newUser(obj) {
        try {
            const nuevo = await new Users(obj)
            console.log(obj);
            await nuevo.save()
            return nuevo
        } catch (error) {
            console.log(error);
        }
    }

}
module.exports = { UserContainer }


