const { Router } = require('express')
const checkAuth = require('../middlewares/checkAuth')
const productRoutes = Router()

const { uploadProd } = require('../middlewares/multer')

const { addProducts, postProduct, showProduct } = require('../controllers/products.controllers')


productRoutes.get('/nuevoproducto', addProducts)

productRoutes.get('/productos/:id', showProduct)

productRoutes.post('/nuevoproducto', uploadProd.single('fotoProducto'), postProduct)



module.exports = productRoutes