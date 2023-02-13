const { Router } = require('express')
const checkAuth = require('../middlewares/checkAuth')
const productRoutes = Router()

const { uploadProd } = require('../middlewares/multer')

const { addProducts, postProduct, showProduct,
    modifyProduct, getProduct, findProduct, deleteProduct } = require('../controllers/products.controllers')


productRoutes.get('/newproduct', addProducts)
productRoutes.post('/nuevoproducto', uploadProd.single('fotoProducto'), postProduct)

productRoutes.get('/putproduct', findProduct)
productRoutes.post('/buscarproducto', getProduct)
productRoutes.post('/modificarproducto', uploadProd.single('fotoProducto'), modifyProduct)
productRoutes.post('/deleteproduct', deleteProduct)
productRoutes.get('/products/:id', showProduct)


module.exports = productRoutes