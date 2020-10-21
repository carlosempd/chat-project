const { io } = require('../server');
const { User } = require('../classes/user');
const { createMessage } = require('../utils/utils');

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

        // Notify new user in the chat
        client.broadcast.to(data.room).emit( 'listUser', users.getUsersByChat(data.room) );

        callback(users.getUsersByChat( data.room ));
    });

    // On Create Message
    client.on('createMessage', (data) => {
        
        const user = users.getUser(client.id);
        
        
        const message = createMessage( user.name, data.message );

        // emit message
        client.broadcast.to(user.room).emit('createMessage', message);
    });

    // On left a chat
    client.on('disconnect', () => {
        const deletedUser = users.DeleteUser( client.id );

        // Notify a user left the chat
        client.broadcast.to(deletedUser.room).emit('createMessage',  createMessage('Admin', `${ deletedUser.name } left the chat`));

        client.broadcast.to(deletedUser.room).emit( 'listUser', users.getUsersByChat(deletedUser.room) );

    });

    // private messages
    client.on('privateMessage', data => {
        const user = users.getUser(client.id);

        client.broadcast.to(data.to).emit('privateMessage', createMessage(user.name, data.message));
    });

   

});