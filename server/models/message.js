const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Schema for messages
 */
let messageSchema = new Schema({
    idUser: {
        type: String,
        required: [true, 'User Id is required']
    },

    name: {
        type: String,
        required: [true, 'Name is required']
    },

    message: {
        type: String,
        required: [true, 'Message is required']
    },

    date: {
        type: Date,
        default: new Date().getTime()
    },

    idAddressee: {
        type: String,
        required: [true, 'addressee id is required']
    },

    nameAddressee: {
        type: String,
        required: [true, 'addressee name is required']
    }


});

module.exports = mongoose.model('Message', messageSchema);

