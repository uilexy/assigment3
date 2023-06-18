const router = require("express").Router()
const user = require("../controller/usercontroller")

router.post("/register", user.register)
router.get("/", user.getAllUser)
router.post("/login", user.login)
router.delete("/:id", user.deleteUser)

module.exports = router