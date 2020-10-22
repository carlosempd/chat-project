var socket = io();

var params= new URLSearchParams( window.location.search );


if ( !params.has('name') || !params.has('room') ) {
    window.location = 'index.html';
    throw new Error('Name and room are necessary');
}

var user = {
    name: params.get('name'),
    room: params.get('room')
};

socket.on('connect', function() {
    

    socket.emit('enterChat', user, function(resp) {
        renderUsers(resp);
    });
});

// escuchar
socket.on('disconnect', function() {
    // user disconnected
});


// Listen info
socket.on('createMessage', function(message) {
    renderMessages(message, false);
    scrollBottom();

});

// When a user enters/leaves a chat
socket.on('listUser', function(users) {
    
    renderUsers(users);
});

// private messages
socket.on('privateMessage', function(message) {
    // Send a private message
});