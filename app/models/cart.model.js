const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    userId: {
        type: String, required: true
    },
    productos: {
        type: Array, required: true
    },
    total: {
        type: Number, default: 0, required: true
    }
})

module.exports = mongoose.model('carritos', cartSchema)