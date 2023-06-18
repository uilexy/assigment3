const router = require("express").Router()
const photo = require("../controller/photocontroller")
const authentication = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

router.use(authentication)
router.get("/", photo.getAllPhoto)
router.get("/:id", photo.getPhotoById)
router.post("/", photo.createPhoto)
router.delete("/:id",authorization,photo.deletePhoto)
router.put("/:id",authorization,photo.updatePhoto)

module.exports = router