const mongoose = require('mongoose')

const msjSchema = new mongoose.Schema({
    userEmail: {
        type: String, required: true
    },
    message: {
        type: String, required: true
    }
})

module.exports = mongoose.model('messages', msjSchema)