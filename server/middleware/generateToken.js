const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config()

const generateToken = (userId) => {
    return jwt.sign({userId} , "process.env.jwtUserToken",{
        expiresIn : '30d'
    })
}

module.exports = generateToken