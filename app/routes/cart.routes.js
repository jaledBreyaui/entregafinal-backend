const { Router } = require('express')
const checkAuth = require('../middlewares/checkAuth')
const cartRoutes = Router()

const { renderCart, addToCart, newOrder, showOrders, deleteProduct } = require('../controllers/cart.controllers')

cartRoutes.get('/cart', checkAuth, renderCart)

cartRoutes.post('/addcart', checkAuth, addToCart)

cartRoutes.post('/deletefromcart', checkAuth, deleteProduct)

cartRoutes.post('/neworder', checkAuth, newOrder)

cartRoutes.get('/history', checkAuth, showOrders)

module.exports = cartRoutes