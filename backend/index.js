const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const { AuthController } = require('./controllers/AuthController');
const { MessageController } = require('./controllers/MessageController');
const { UserController } = require('./controllers/UserController');
const { defineCurrentUser } = require('./middleware/defineCurrentUser');

mongoose.connect("mongodb+srv://felineengineer:felineengineering@cluster0.yecei.mongodb.net/1-13-program-demo?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true });

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(defineCurrentUser)
app.use('/auth', AuthController)
app.use('/users', UserController)
app.use('/messages', MessageController)

app.listen(5000, () => {
    console.log('Backend Listening on port 5000')
})