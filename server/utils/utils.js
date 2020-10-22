

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