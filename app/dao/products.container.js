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

    async modifyProduct(obj) {
        try {
            await Prod.updateOne({ "_id": obj.id }, {
                $set: {
                    marca: obj.marca,
                    nombre: obj.nombre,
                    precio: obj.precio,
                    tags: obj.tags,
                    imagen: obj.imagen
                }
            })
            return 'product updated'
        } catch (error) {
            return error
        }
    }

    async deleteProduct(prodId) {
        try {
            console.log(prodId);
            const prod = await Prod.findOneAndDelete({ "_id": prodId })
            console.log(prod);
            return 'Product deleted'
        } catch (error) {
            return error
        }
    }
}

module.exports = { ProductsContainer }