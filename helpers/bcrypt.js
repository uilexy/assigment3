const bcrypt = require("bcryptjs")

function hashPassword(userPassword) {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(userPassword, salt)
    return hash
}

function comparePassword(userPassword, hashedPassword) {
    return bcrypt.compareSync(userPassword, hashedPassword)
    
}
module.exports = {
    hashPassword,
    comparePassword
}