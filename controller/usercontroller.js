const { User } = require("../models")
const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")

class usercontroller {
    static async getAllUser(req,res) {
        try {
            const data = await User.findAll({
                where: {}
            })

            res.status(201).json({User: data})
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async register(req,res) {
        try {
            const {
                email,
                password,
                username
            } = req.body

            const data = await User.create({
                email,
                password,
                username
            })
            console.log(data);

            const response = {
                id: data.id,
                email: data.email,
                username: data.username
            }
            res.status(201).json({data: response})
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    static async login(req,res) {
        try {
            const { 
                email,
                password
            } = req.body
    
            const data = await User.findOne({
                where: {
                    email
                }
            })
            console.log(data);
            if(!data) {
               return res.status(401).json({
                name: "User Login error",
                message: `User With Email ${email} not found`
               })
                
            }
            const isCorrect = comparePassword(password, data.password)
            console.log(isCorrect);
            console.log(comparePassword);
            if(!isCorrect) {
                throw {
                    name: "User Login Error",
                    message: `User password with email "${email}" does match`
                }
            }

            const payload = {
                id: data.id,
                email: data.email,
                username: data.username
            }

            const token = generateToken(payload)
    
            res.status(201).json({token})
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    static async deleteUser(req,res) {
        try {
            const { id } = req.params

            const data = await User.destroy({
                where: {
                    id
                }
            })
            if(!data) {
                throw {
                    code: 500,
                    message: `User id ${id} not found`
                }
            }

            res.status(201).json({User: "User delete success!"})
        } catch (error) {
            res.status(500).json({error: error})
        }
    }
}

module.exports = usercontroller