require("dotenv").config()

const express = require("express")
const app = express()
const router = require("./router")
const PORT = process.env.PORT
const env = process.env.NODE_ENV


app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

if(env !== "test") {
app.listen(PORT, () => {
    console.log("APP RUNNING IN PORT 3000");
})}

module.exports = app