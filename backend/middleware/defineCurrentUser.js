const { User } = require('../models/User')
const  jwt = require('jsonwebtoken')

async function defineCurrentUser(req, res, next){
    try {
        const [ _, token ] = req.headers.authorization.split(' ')
        const { id } = await jwt.decode(token)
        req.currentUser = await User.findById(id)
    } catch(err){  }
    next()
}

module.exports.defineCurrentUser = defineCurrentUser