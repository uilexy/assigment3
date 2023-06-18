const { Photo } = require("../models")

const authorization = async (req,res,next) => {
    try {
        const PhotoId = req.params.id
        const UserId = req.UserData.id
   
        const photo = await Photo.findOne({
           where: {
               id: PhotoId
           }
        })
        console.log(photo, "<<Photo authorizstion");
        if(!photo) {
           return res.status(404).json({
               name: "Data not found",
               message: `Photo with id ${PhotoId} not found`
           })
        }
        if(photo.UserId === UserId) {
           return next()
        } else {
           return res.status(404).json({
               name: "Authorization error",
               message: `Users with id ${UserId} do not have permission to access Photo with id ${PhotoId} `
           })
        }
    } catch (error) {
        return res.status(500).json(error)
        console.log(error);
    }

}

module.exports = authorization