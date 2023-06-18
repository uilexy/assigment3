const { Photo, User } = require("../models")

class photocontroller {
    static async getAllPhoto(req, res) {
        try {
            const data = await Photo.findAll({
                where: { },
                include: User
            })
            console.log(data);
            console.log(User);
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    static async getPhotoById(req, res) {
        try {
            const { id } = req.params
            console.log(id);

            const data = await Photo.findOne({
                where: {
                    id
                }
            })
            if(!data) {
                return res.status(401).json({
                    code: 401,
                    message: "Data not found"
                })
            }

            res.status(200).json({
                Photo: data})
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    static async createPhoto(req, res) {
        try {
            const { id } = req.UserData
            const {
                title,
                caption,
                image_url
            } = req.body

            const data = await Photo.create({
                title,
                caption,
                image_url,
                UserId: id
            })
            console.log({ caption });

            const response = {
                id: data.id,
                title: data.title,
                caption: data.caption,
                image_url: data.image_url,
                UserId: id
            }

            res.status(200).json({Photo: response})
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    static async deletePhoto(req, res) {
        try {
            const { id } = req.params

            const data = await Photo.destroy({
                where: {
                    id
                }
            })

            res.status(200).json({
                message: "Photo delete success"
            })
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }

    static async updatePhoto(req,res) {
        try {
            const { id } = req.params

            const { 
                title,
                caption,
                image_url
            } = req.body

            const data = await Photo.update({
                title,
                caption,
                image_url
            }, {
                where: {
                    id
                },
                returning: true
            })
            console.log(data);

            const response = {
                id: data[1][0].id,
                title: data[1][0].title,
                caption: data[1][0].caption,
                image_url: data[1][0].image_url
            }
            console.log(response);
            res.status(200).json({Photo: response})
        } catch (error) {
            res.status(500).json(error)
            console.log(error);
        }
    }
}

module.exports = photocontroller