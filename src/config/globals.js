require('dotenv').config()
const mongoose = require('mongoose');
const {initializeApp,applicationDefault} = require('firebase-admin/app');
const {getFirestore} = require('firebase-admin/firestore');
async function mongoConnection() {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
    } catch(e){
        throw new Error(`Error en DB ${e.message}`);
    }
}
function getFirebaseConnection() {
    initializeApp({
        credential:applicationDefault()
    })

    const db = getFirestore();
    return db;
};

module.exports = {
	mongoConnection,
    getFirebaseConnection
}