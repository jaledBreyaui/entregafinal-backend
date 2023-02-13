const { Router } = require('express')
const checkAuth = require('../middlewares/checkAuth')
const cartRoutes = Router()

const { renderCart, addToCart, newOrder, showOrders, deleteProduct, addAndBuy, minusOne, emptyCart } = require('../controllers/cart.controllers')

cartRoutes.get('/cart', checkAuth, renderCart)

//actualizan cantidades
cartRoutes.post('/addcart', checkAuth, addToCart)
cartRoutes.post('/minusone', checkAuth, minusOne)

//elimina directamente
cartRoutes.post('/deletefromcart', checkAuth, deleteProduct)

//vaciar carrito

cartRoutes.post('/emptycart', checkAuth, emptyCart)

cartRoutes.post('/buynow', checkAuth, addAndBuy)

//checkout
cartRoutes.post('/neworder', checkAuth, newOrder)


cartRoutes.get('/history', checkAuth, showOrders)

module.exports = cartRoutes