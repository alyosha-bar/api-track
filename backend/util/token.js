const crypto = require('crypto')

// generate token 
const generateToken = () => {
    return crypto.randomBytes(32).toString('hex')
}

module.exports = {
    generateToken
}