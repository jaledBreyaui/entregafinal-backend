require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT

//session
const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }

//Rutas
const userRoutes = require('./app/routes/user.routes')
const chatRoutes = require('./app/routes/chat.routes')
const productRoutes = require('./app/routes/products.routes')
const cartRoutes = require('./app/routes/cart.routes')


///Chat

const { Server: IOServer } = require('socket.io');
const { Server: HttpServer } = require('http');
const serverHttp = new HttpServer(app);
const io = new IOServer(serverHttp)


const { Chatcontainer } = require('./app/dao/chat.container')
const chats = new Chatcontainer()
const cookieParser = require('cookie-parser')


///Middleware

app.use(express.static(__dirname))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


app.use(session({
    secret: "1234",
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 150000000,
    },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI,
        mongoOptions: advancedOptions
    })
}))

const passport = require('./app/middlewares/passport')
const { dirname } = require('path')
app.use(passport.session())
app.use(passport.initialize())


app.set('view engine', 'ejs')
app.set('views', __dirname + '/public/views')


app.use('/', userRoutes)
app.use('/chat', chatRoutes)
app.use('/', productRoutes)
app.use('/', cartRoutes)


///Socket.io

io.on('connection', async socket => {
    socket.emit('chat-server', await chats.getAll())

    socket.on('new-message', async obj => {
        await chats.postMsj(obj)
        io.sockets.emit('chat-server', await chats.getAll())
    })
})


///Server

serverHttp.listen(PORT, (err) => {
    if (err) console.log(err);
    console.log(`server up in port: ${PORT}`);
})


