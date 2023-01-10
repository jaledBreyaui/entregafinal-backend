const { Router } = require('express')
const checkAuth = require('../middlewares/checkAuth')
const chatRoutes = Router()

const { getChat, getUserChat } = require('../controllers/chat.controllers')


chatRoutes.get('/', checkAuth, getChat)

chatRoutes.get('/:email', checkAuth, getUserChat)


module.exports = chatRoutes