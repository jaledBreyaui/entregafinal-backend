const multer = require('multer')

const storeProdImg = multer.diskStorage({
    destination: (req, _file, cb) => {
        cb(null, 'public/imgs/productpics')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}`)
    }
})

const storeAvatar = multer.diskStorage({
    destination: (req, _file, cb) => {
        cb(null, 'public/imgs/profilepics')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.originalname}-${Date.now()}`)
    }
})

const uploadProd = multer({ storage: storeProdImg })

const uploadProfile = multer({ storage: storeAvatar })

module.exports = { uploadProd, uploadProfile }