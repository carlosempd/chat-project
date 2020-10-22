/** 
 * Port
*/
process.env.PORT = process.env.PORT || 3000;

/** 
 * Database
*/
const urlDB = process.env.MONGO_URI || 'mongodb+srv://carlos:carlos123@cluster0.rhpb3.mongodb.net/chat?retryWrites=true&w=majority';
process.env.MONGO_URI = urlDB;