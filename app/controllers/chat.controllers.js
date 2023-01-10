const { Chatcontainer } = require('../dao/chat.container')
const chat = new Chatcontainer()

const getChat = async (req, res) => {
    res.render('allChats', { req })
}

const getUserChat = async (req, res) => {
    const userEmail = req.params.email
    const chats = await chat.getChat(userEmail)
    console.log(chats);
    res.render('chat', { req, chats })
}


module.exports = { getChat, getUserChat }