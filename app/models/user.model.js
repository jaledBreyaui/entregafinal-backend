const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    fechanacimiento: {
        type: Date,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    foto: {
        type: String
    }
})

module.exports = mongoose.model('usuarios', usersSchema)