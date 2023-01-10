const { UserContainer } = require('../dao/user.container')
const mongo = new UserContainer()
const { ProductsContainer } = require('../dao/products.container')
const prod = new ProductsContainer()

const getHome = async (req, res) => {
    const productos = await prod.getProducts()
    res.render('home', { productos })
}

const signed = async (req, res) => {
    const productos = await prod.getProducts()
    res.render('signed', { req, productos })
}

const register = (req, res) => {
    res.render('register')
}

const logOut = (req, res, next) => {
    req.logOut((err) => {
        if (err) { return next(err) }
        res.redirect('/')
    })
}


const renderProfile = async (req, res) => {
    res.render('profile', { req })
}

module.exports = {
    getHome, signed, logOut, register, renderProfile
}