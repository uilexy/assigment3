const jwt = require("jsonwebtoken")
const SECRET_KEY = "inirahasia"

const generateToken = (payload) => {
    const token = jwt.sign(payload, SECRET_KEY)
    return token
}

const verifyToken = (token) => {
    const decode = jwt.verify(token, SECRET_KEY)
    return decode
}

module.exports = {
    generateToken,
    verifyToken
}