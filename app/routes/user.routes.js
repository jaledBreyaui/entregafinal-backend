const { Router } = require('express')
const userRoutes = Router()
const checkAuth = require('../middlewares/checkAuth')
const passport = require('passport')
const { uploadProfile } = require('../middlewares/multer')



const { getHome, signed, logOut, register, renderProfile } = require('../controllers/user.controllers')


userRoutes.get('/', getHome)

userRoutes.post('/signin', passport.authenticate('login', {
    successRedirect: '/signed',
    failureRedirect: '/signup'
}))

userRoutes.get('/signup', register)

userRoutes.post('/signup', uploadProfile.single('archivo'), passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup'
}))

userRoutes.get('/signed', checkAuth, signed)

userRoutes.get('/logout', logOut)

userRoutes.get('/profile', checkAuth, renderProfile)


module.exports = userRoutes