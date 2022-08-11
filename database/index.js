const mongoose = require('mongoose');
require('dotenv').config();
const dbURI=process.env.MONGOURI;
async function connectDatabase(){
    const mongoURI = dbURI;
    
    try {
        
       await mongoose.connect(mongoURI);
       console.log('Database connected');
    } catch (error) {
        console.log(`Database connection failed ${error}`)
    }
}

module.exports = connectDatabase;