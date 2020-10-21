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
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function(resp) {
        console.log('Usuarios conectados', resp);
    });
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Send Message
// socket.emit('createMessage', {
//     usuario: 'Fernando',
//     mensaje: 'Hola Mundo'
// }, function(resp) {
//     console.log('respuesta server: ', resp);
// });

// Listen info
socket.on('createMessage', function(mensaje) {

    console.log('Servidor:', mensaje);

});

// When a user enters/leaves a chat
socket.on('listUser', function(users) {
    console.log(users);
});

// private messages
socket.on('privateMessage', function(message) {
    console.log('Private Message: ', message);
});