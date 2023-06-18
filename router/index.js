const router = require("express").Router()
const photoRouter = require("./photo")
const userRouter = require("./user")

router.use("/photo", photoRouter)
router.use("/user", userRouter)

module.exports = router

