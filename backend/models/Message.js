const mongoose = require('mongoose');
const { Schema } = mongoose;

let schema = new Schema({
    from:  String, 
    sent: Date,
    subject: String,
    content:   String,
    isRead: Boolean
});

const Message = mongoose.model('Message', schema);

module.exports = { Message, schema }