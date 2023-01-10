const mongoose = require('mongoose')

const prodSchema = new mongoose.Schema({
    marca: {
        required: true,
        type: String
    },
    nombre: {
        required: true,
        type: String

    },
    precio: {
        required: true,
        type: String
    },
    tags: {
        required: true,
        type: String
    },
    imagen: {
        type: String
    }
    // },
    // id: {
    //     type: Number,
    //     required: true
    // }
})

module.exports = mongoose.model('productos', prodSchema)