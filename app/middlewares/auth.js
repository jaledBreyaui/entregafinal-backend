const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (user) => {
    const token = jwt.sign({ data: user }, process.env.JWTOKEN_KEY, { expiresIn: '1h' })
    return token
}

const checkToken = (req, res, next) => {
    const token = req.headers.authorization

    if (!token) {
        res.status(401).json({ error: 'not authorized' })
    }

    jwt.verify(token, process.env.JWTOKEN_KEY, (err, decoded) => {
        if (err) {
            res.status(401).json({ error: 'not authorized' })
        }
        req.user = decoded.data
        next()
    })
    next()
}

module.exports = generateToken, checkToken 