const jwt = require('jsonwebtoken')
const { Router } = require('express')
const { User } = require('../models/User')
const { Message } = require('../models/Message')
const MessageController = new Router()

MessageController.post('/', async (req, res) => {
    const { username, subject, content } = req.body
    if(!username){
        return res.json({
            error: {
                username: {
                    message: 'Username is required'
                }
            }
        })
    }
    if(!subject){
        return res.json({
            error: {
                subject: {
                    message: 'Subject is required'
                }
            }
        })
    }
    const sender = req.currentUser
    const recipient = await User.findOne({ username: username })
    if(!sender){
        return res.json({
            error: {
                message: 'Must be logged in to send a message'
            }
        })
    }
    if(!recipient){
        return res.json({
            error: {
                username: {
                    message: 'Could not find a user with this username'
                }
            }
        })
    }
    const message = new Message({ content, subject, from: sender.username, sent: new Date, isRead: false })
    recipient.inbox.unshift(message)
    await recipient.save()
    res.json({
        message
    })
})

MessageController.post('/delete', async (req, res) => {
    if(!req.currentUser){
        return res.json({
            error: {
                message: 'Must be logged in to delete messages'
            }
        })
    }
    let messageIds = req.body
    let currentUser = req.currentUser

    currentUser.inbox = currentUser.inbox.filter( message => (
       !messageIds.includes(message._id.toString())
    ))

    await currentUser.save()

    res.json({
        success: true
    })
})

MessageController.post('/read', async (req, res) => {
    if(!req.currentUser){
        return res.json({
            error: {
                message: 'Must be logged in to delete messages'
            }
        })
    }
    let messageIds = req.body
    let currentUser = req.currentUser

    currentUser.inbox.forEach( message => {
        if(messageIds.includes(message._id.toString())){
            message.isRead = true
        }
    })

    await currentUser.save()

    res.json({
        success: true
    })
})

MessageController.post('/unread', async (req, res) => {
    if(!req.currentUser){
        return res.json({
            error: {
                message: 'Must be logged in to delete messages'
            }
        })
    }
    let messageIds = req.body
    let currentUser = req.currentUser

    currentUser.inbox.forEach( message => {
        if(messageIds.includes(message._id.toString())){
            message.isRead = false
        }
    })

    await currentUser.save()

    res.json({
        success: true
    })
})

module.exports.MessageController = MessageController