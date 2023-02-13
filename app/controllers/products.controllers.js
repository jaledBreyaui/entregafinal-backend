const { ProductsContainer } = require('../dao/products.container')
const mongo = new ProductsContainer()

const addProducts = (req, res) => {
    res.render('addprod.ejs')
}

const postProduct = async (req, res) => {
    const { file } = req
    if (file) {
        const imagen = `${file.filename}`
        const { nombre, precio, tags, marca } = req.body
        const obj = { nombre, precio, tags, imagen, marca }
        if (obj) {
            await mongo.postProducts(obj)
        }
    }
    res.redirect('/newproduct')
}

const showProduct = async (req, res) => {
    const prodId = req.params.id
    const productArr = await mongo.getProducts(prodId)
    const product = productArr[0]
    res.render('singleProduct', { req, product })
}

const findProduct = async (req, res) => {
    product = []
    res.render('putprod.ejs', { product })
}

const getProduct = async (req, res) => {
    const prodId = req.body.prodId
    const productArr = await mongo.getProducts(prodId)
    const product = productArr[0]
    res.render('putprod.ejs', { product })
}

const modifyProduct = async (req, res) => {
    const { file } = req
    const { nombre, precio, tags, marca, id } = req.body
    if (file) {
        const imagen = `${file.filename}`
        const obj = { nombre, precio, tags, imagen, marca, id }
        await mongo.modifyProduct(obj)
    } else {
        const prodData = await mongo.getProducts(id)
        const imagen = prodData[0].imagen
        const obj = { nombre, precio, tags, imagen, marca, id }
        await mongo.modifyProduct(obj)
    }
    res.redirect('/putproduct')
}

const deleteProduct = async (req, res) => {
    const prodId = req.body.id
    await mongo.deleteProduct(prodId)
    res.redirect('/putproduct')
}

module.exports = {
    postProduct, addProducts, showProduct,
    modifyProduct, getProduct, findProduct,
    deleteProduct
}