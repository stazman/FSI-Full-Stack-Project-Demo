const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User, defaultMessages } = require('../models/User.js')

const UserController = new Router()

UserController.post('/', async (req, res) => {
    const { name, username, password = '' } = req.body
    const passwordDigest = await bcrypt.hash(password, 10)
    const existing = await User.find({ username })
    if(password.length === 0){
        return res.json({
            error: {
                password: {
                    message: `Password is required`
                }
            }
        })
    }
    if(existing.length > 0){
        return res.json({
            error: {
                message: `There is an existing user with the username "${username}"`
            }
        })
    }
    try {
        const user = await User.create({ name, username, passwordDigest, inbox: defaultMessages })
        const token = await jwt.sign({ id: user._id }, 'asdlfjalsdfj')
        res.json({
            token: token,
            user: user
        })
    } catch(validation){
        res.json({
            error: validation.errors
        })
    }
})

module.exports.UserController = UserController