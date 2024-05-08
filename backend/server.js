const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser')
require('dotenv').config();
const app = express();
const port = 3000; // Define el puerto del servidor
const mongoose = require('mongoose');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())

const startServer = async () => {
    //Conect Database
    await mongoose.connect(process.env.MONGO_URI )
    //setings
    app.listen(process.env.PORT || port, () => console.log('Listening'));
}
startServer();

app.use('/auth', require('./routes/auth'))
app.use('/user', require('./routes/user'))
app.use('/categories', require('./routes/category'))
app.use('/thematic', require('./routes/thematic'))