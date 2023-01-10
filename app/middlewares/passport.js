const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;   //-> estrategia
const bcrypt = require('bcrypt')

const { UserContainer } = require('../dao/user.container')
const mongo = new UserContainer()

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password)

}

const createHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

passport.use('signup',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
        async (req, email, password, done) => {
            const { nombre, apellido, fechanacimiento, telefono, direccion, verifyPassword } = req.body
            const { file } = req
            const foto = file.filename
            const nuevo = { nombre, apellido, email, password: createHash(password), fechanacimiento, telefono, direccion, foto }
            let users = await mongo.getUsers()
            let user = users.find(user => user.email === email)
            if (user) {
                console.log('User already exists');
                return done(null, false)
            }
            if (password !== verifyPassword) {
                console.log('Password does not match');
                return done(null, false)
            }
            await mongo.newUser(nuevo)
            newUser = await mongo.getByEmail(email)
            return done(null, newUser[0])
        }
    ))

passport.use('login',
    new LocalStrategy(
        { usernameField: 'email', passwordField: 'password', passReqToCallback: true },
        async (req, email, password, done) => {
            let users = await mongo.getUsers()
            let user = users.find(user => user.email === email)
            if (!user) {
                console.log("user not found");
                return done(null, false)
            }
            if (!isValidPassword(user, password)) {
                console.log('Password incorrecto')
                return done(null, false, { message: 'Password incorrect' })
            }

            return done(null, user)
        }))


passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    let user = await mongo.getById(id)
    done(null, user)
})

module.exports = passport