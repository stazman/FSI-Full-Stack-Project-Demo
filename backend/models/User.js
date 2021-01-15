const mongoose = require('mongoose');
const { schema: messageSchema, Message } = require('./Message')
const { Schema } = mongoose;

let schema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    username: {
        type: String,
        required: [true, 'Username is required']
    },
    passwordDigest: {
        type: String,
        required: [true, 'Password is required']
    },
    inbox: [messageSchema]
});

module.exports.User = mongoose.model('User', schema);
module.exports.defaultMessages = [
    new Message({
        subject: 'Welcome!',
        content: 'Welcome to this demo of a project from the Full Stack extended program! Congratulations on completing the introductory course!',
        from: 'HackerUSA',
        sent: new Date,
        isRead: false
    }),
    new Message({
        subject: 'An Urgent Message',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation',
        from: 'HackerUSA',
        sent: new Date,
        isRead: false
    }),
    new Message({
        subject: 'Straight Spam',
        content: 'Don\'t event open it',
        from: 'Spamsalot',
        sent: new Date,
        isRead: false
    }),
    new Message({
        subject: 'Some Social Media Updates',
        content: 'That you probably already saw',
        from: 'Facebook',
        sent: new Date,
        isRead: false
    }),
    new Message({
        subject: 'Your dependencies are out of date',
        content: 'And we know you don\'t care ',
        from: 'GitHub',
        sent: new Date,
        isRead: false
    }),
    new Message({
        subject: 'Weekly Apple News Update',
        content: 'Things are mostly getting worse but at least we have a streaming service now for some reason',
        from: 'Apple',
        sent: new Date,
        isRead: false
    }),
    new Message({
        subject: 'Your order is on it\'s way!',
        content: 'Thank you for placing your 1,316,033,406th order',
        from: 'Amazon',
        sent: new Date,
        isRead: false
    })
]