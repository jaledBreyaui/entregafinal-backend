const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user: {
        required: true,
        type: Object
    },
    productos: {
        required: true,
        type: Array
    },
    fecha: {
        type: String,
        required: true
    },
    total: {
        required: true,
        type: Number
    }
})

module.exports = mongoose.model('orders', orderSchema)