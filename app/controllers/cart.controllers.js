const { CartContainer } = require('../dao/cart.container')
const mongo = new CartContainer()

const addToCart = async (req, res) => {
    const prodId = req.body.id
    const userId = req.user[0].id
    await mongo.addToCart(userId, prodId)
    res.redirect('/signed')
}

const deleteProduct = async (req, res) => {
    const prodId = req.body.id
    const userId = req.user[0].id
    await mongo.deleteProduct(userId, prodId)
    console.log(prodId);
    res.redirect('/cart')
}

const renderCart = async (req, res) => {
    const userId = req.user[0].id
    const cart = await mongo.getCart(userId)
    const total = await mongo.checkTotal(userId)
    console.log(total);
    const productos = []
    if (cart.length) {
        const productos = cart[0].productos
        res.render('cart.ejs', { req, productos, total })
    } else {
        res.render('cart.ejs', { req, productos, total })
    }
}

const newOrder = async (req, res) => {
    const userId = req.user[0].id
    const cart = await mongo.getCart(userId)
    const productos = cart[0].productos
    await mongo.newOrder(productos, userId)
    res.redirect('/signed')
}

const showOrders = async (req, res) => {
    const userId = req.user[0].id
    const prevOrders = await mongo.bringOrders(userId)
    res.render('orders', { req, prevOrders })
}

module.exports = { addToCart, renderCart, newOrder, showOrders, deleteProduct }