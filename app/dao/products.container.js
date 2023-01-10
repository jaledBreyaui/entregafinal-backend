const connection = require('../../config/mongoConnect')
const Prod = require('../models/product.model')


class ProductsContainer {
    constructor() {
        connection()
    }
    async getProducts(id) {
        try {
            if (id) {
                const prod = await Prod.find({ "_id": id })
                return prod
            } else {
                const prod = await Prod.find({})
                return prod
            }
        } catch (error) {
            return error
        }
    }

    async postProducts(obj) {
        try {
            const add = await new Prod(obj)
            await add.save()
            return { msj: 'Producto añadido!', add }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = { ProductsContainer }