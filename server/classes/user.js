class User {
    
    constructor() {
        this.connectedUsers = [];
    }

    addUser( id, name, room ) {
        let user = {
            id,
            name,
            room
        };

        this.connectedUsers.push(user);

        return this.connectedUsers;
    }

    getUser( id ) {
        const user = this.connectedUsers.filter( user => user.id === id)[0];
        return user;
    } 

    getAllUsers() {
        return this.connectedUsers;
    }

    getUsersByChat(room) {
        const usersByChat = this.connectedUsers.filter(user => user.room === room);

        return usersByChat;
    }

    DeleteUser( id ) {
        const deletedUser = this.getUser(id);

        this.connectedUsers = this.connectedUsers.filter(user => user.id !== id);

        return deletedUser;
    }

}

module.exports = {
    User
};