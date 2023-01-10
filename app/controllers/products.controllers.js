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
    res.redirect('/nuevoproducto')
}

const showProduct = async (req, res) => {
    const prodId = req.params.id
    const productArr = await mongo.getProducts(prodId)
    const product = productArr[0]
    res.render('singleProduct', { req, product })
}

module.exports = { postProduct, addProducts, showProduct }