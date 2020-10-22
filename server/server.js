require('../server/config/config');

const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');

app.use(express.static(publicPath));

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (error, res) => {   
    if (error) throw error;

    console.log('Database ONLINE');
});



server.listen( process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${  process.env.PORT }`);

});