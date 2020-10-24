require('../server/config/config');

const express = require('express');
const mongoose = require('mongoose');
const socketIO = require('socket.io');
const http = require('http');

const path = require('path');

const app = express();
let server = http.createServer(app);

const publicPath = path.resolve(__dirname, '../public');

const Message = require('./models/message');

app.use(express.static(publicPath));


/**
 * Route to retrieve messages by room
 * 
 * This can be separated as a service,
 * It is placed here just to show in the test for Bunkey
 */
app.get('/messages/:room', (req, res) => {

  // This can be achieved with a middleware
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  const room = req.params.room;

  // Paginate params
  let skip = req.params.skip || 0;
  skip = Number(skip);

  let limit = req.params.limit || 100;
  limit = Number(skip);

  Message.find({ idAddressee: room })
          .limit(limit)
          .skip(skip)
          .exec((err, messages) => {
            
            if (err) {
              return res.status(400).json({
                status: false,
                err
              });
            }

            res.json({
              ok: true,
              messages
            });
          });


});

// IO = esta es la comunicacion del backend
module.exports.io = socketIO(server);
require('./sockets/socket');

// Conectar a MONGODB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}, (error, res) => {   
    if (error) throw error;

    console.log('Database ONLINE');
});


// Start Server
server.listen( process.env.PORT, (err) => {

    if (err) throw new Error(err);

    console.log(`Servidor corriendo en puerto ${  process.env.PORT }`);

});