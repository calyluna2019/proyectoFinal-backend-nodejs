require('dotenv').config()
const mongoose = require('mongoose');
async function mongoConnection() {
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log('connect to mongoDB');
    } catch(e){
        throw new Error(`Error en DB ${e.message}`);
    }
}

module.exports = {
	mongoConnection
}