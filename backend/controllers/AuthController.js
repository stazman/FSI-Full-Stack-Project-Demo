const { Router } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { User } = require('../models/User')

const AuthController = new Router()

AuthController.post('/', async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username: username })
    if(user === null){
        return res.json({
            error: {
                username: {
                    message: 'Could not find a user with this username'
                }
            }
        })
    }
    if(!await bcrypt.compare(password, user.passwordDigest)){
        return res.json({
            error: {
                password: {
                    message: 'Incorrect password for provided username'
                }
            }
        })
    }
    const { _id: id } = user;
    const token = await jwt.sign({ id }, 'asdlfjalsdfj')
    res.json({
        token: token,
        user: user
    })
})

AuthController.get('/profile', async (req, res) => {
    res.json({
        user: req.currentUser
    })
})

module.exports.AuthController = AuthController