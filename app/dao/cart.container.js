const connection = require('../../config/mongoConnect')
const Cart = require('../models/cart.model')
const Order = require('../models/order.model')
const sendSms = require('../middlewares/neworder.twilio')
const newOrderMail = require('../middlewares/neworder.mailer')

const { ProductsContainer } = require('./products.container')
const prod = new ProductsContainer()
const { UserContainer } = require('./user.container')
const users = new UserContainer()


class CartContainer {
    constructor() {
        connection()
    }
    ///Cart funcs
    async getCart(userId) {
        try {
            const cart = await Cart.find({ 'userId': userId })
            return cart
        } catch (error) {
            return error
        }
    }

    async addToCart(userId, prodId) {
        try {
            const cart = await Cart.find({ 'userId': userId })
            const productData = await prod.getProducts(prodId)
            const { nombre, precio, imagen } = productData[0]
            const product = { nombre, precio, prodId, imagen, cantidad: 1 }
            //// Si ya existe
            if (cart.length) {
                const allProdsInCart = cart[0].productos
                const notYet = allProdsInCart.every(prod => {
                    return prod.prodId !== prodId
                })
                if (notYet) {
                    /// si no está el producto lo agrega
                    await Cart.updateOne({ 'userId': userId }, { $push: { productos: product } })
                } else {
                    // si ya esta el producto aumenta la cantidad
                    const newCart = allProdsInCart.map((prod, i) => {
                        if (prod.prodId === prodId) {
                            prod.cantidad = prod.cantidad + 1;
                            return prod
                        } else {
                            return prod
                        }
                    })
                    await Cart.updateOne({ 'userId': userId }, { $set: { productos: newCart } })
                }
            }
            /// Si no existe el carrito todavia 
            else {
                const total = product.precio * product.cantidad
                const newCart = await new Cart({ userId, productos: product, total })
                await newCart.save()
                return newCart
            }

        } catch (error) {
            return error
        }
    }

    async deleteFromCart(userId, prodId) {
        const cart = await Cart.find({ 'userId': userId })
        const products = cart[0].productos
        products.map((prod, i) => {
            if (prod.prodId === prodId) {
                products.pop(i)
            }
        })
        await Cart.updateOne({ 'userId': userId }, { $set: { productos: products } })
    }

    async minusOneProduct(userId, prodId) {
        const cart = await Cart.find({ 'userId': userId })
        const products = cart[0].productos
        products.map((prod, i) => {
            if (prod.prodId === prodId) {
                if (prod.cantidad === 1) {
                    products.pop(i)
                } else {
                    prod.cantidad--
                    return prod
                }
            }
        })
        await Cart.updateOne({ 'userId': userId }, { $set: { productos: products } })
    }

    async deleteCart(userId) {
        try {
            await Cart.deleteOne({ 'userId': userId })
        } catch (error) {
            return error
        }
    }


    //////////Orden de compra/////////

    async checkTotal(userId) {
        const cart = await Cart.find({ 'userId': userId })
        if (cart.length) {
            const products = cart[0].productos
            let total = 0
            products.map(prod => {
                const productPrice = prod.precio * prod.cantidad
                total = total + productPrice
            })
            return total
        }
    }
    async newOrder(productos, userId) {
        try {
            const usuario = await users.getById(userId)
            const fecha = new Date().toLocaleDateString('en-GB')
            const total = await this.checkTotal(userId)
            const newOrder = await new Order({ user: usuario[0], productos, fecha, total })
            await newOrder.save()
            sendSms()
            newOrderMail(usuario[0], productos)
            await this.deleteCart(userId)
            return newOrder
        } catch (error) {
            return error
        }
    }

    async bringOrders(userId) {
        try {
            const prevOrders = await Order.find({ 'user_id': userId })
            return prevOrders
        } catch (error) {
            return error
        }
    }
}

module.exports = { CartContainer }


