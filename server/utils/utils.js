
/**
 * Create a new message object
 * @param {string} idUser 
 * @param {string} name 
 * @param {string} message 
 * @param {string} idAddressee 
 * @param {string} nameAddressee 
 */
const createMessage = (idUser, name, message, idAddressee, nameAddressee) => {

    return {
        idUser,
        name,
        message,
        idAddressee,
        nameAddressee,
        date: new Date().getTime()
    };
};

module.exports = {
    createMessage
};