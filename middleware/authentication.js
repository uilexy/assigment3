const { User} = require("../models")
const { verifyToken } = require("../helpers/jwt")

const authentication = async (req,res,next) => {
    try {
        const { token } = req.headers
        if(!token) {
            return res.status(401).json({
                code: 401,
                message: "Token not provided!"
            })
        }

        const decode = verifyToken(token)
        const data = await User.findOne({
            where: {
                id: decode.id,
                email: decode.email
            }
        })
        if(!data) {
            throw {
                code: 401,
                message: "User not Found"
            }
        }

        req.UserData = {
            id: data.id,
            email: data.email,
            username: data.username
        }

        next()
    } catch (error) {
        res.status(500).json(error)
        console.log(error);
    }
}

module.exports = authentication