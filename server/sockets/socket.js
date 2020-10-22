const { io } = require('../server');
const { User } = require('../classes/user');
const { createMessage } = require('../utils/utils');
const Message = require('../models/message');

const users = new User();

// On connection established
io.on('connection', (client) => {

    // On enter a chat
    client.on('enterChat', (data, callback) => {


        if ( !data.name || !data.room ) {
            return callback({
                error: true,
                message: 'Name/Room is required'
            });
        }

        // Join user to a room
        client.join(data.room);

        users.addUser(client.id, data.name, data.room);


        // Notify a user joined the chat
        client.broadcast.to(data.room).emit('createMessage',  createMessage('0', 'Admin', `${ data.name } joined the chat`, client.id, client.room));

        // List users
        client.broadcast.to(data.room).emit('listUser',  users.getUsersByChat(data.room));

        callback(users.getUsersByChat( data.room ));
    });

    // On Create Message
    client.on('createMessage', (data, callback) => {
        
        const user = users.getUser(client.id);
        
        
        const message = createMessage( client.id, user.name, data.message, user.id, user.room );

        // Save message to DB
        const messageDB = new Message(message);
        messageDB.save( (err, savedMessage) => {
            if (err) {
                console.log('An error has ocurred saving the message');
                return;
            }

        });

        // emit message
        client.broadcast.to(user.room).emit('createMessage', message);


        callback(message);
    });

    // On left a chat
    client.on('disconnect', () => {
        const deletedUser = users.DeleteUser( client.id );
        console.log('user left the chat: ', deletedUser);

        // Notify a user left the chat
        client.broadcast.to(deletedUser.room).emit('createMessage',  createMessage('0', 'Admin', `${ deletedUser.name } left the chat`, client.id, client.room));

        client.broadcast.to(deletedUser.room).emit( 'listUser', users.getUsersByChat(deletedUser.room) );

    });

    // private messages
    client.on('privateMessage', data => {
        const user = users.getUser(client.id);

        const message = createMessage( client.id, user.name, data.message, data.to, data.name);

        // Save message to DB
        const messageDB = new Message(message);
        messageDB.save( (err, savedMessage) => {
            if (err) {
                console.log('An error has ocurred saving the message', err);
            }

        });

        client.broadcast.to(data.to).emit('privateMessage', message);
    });

   

});