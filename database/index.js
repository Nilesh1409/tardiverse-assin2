const mongoose = require('mongoose');

async function connectDatabase(){
    const mongoURI = 'mongodb+srv://nilesh_new:BOQtSkZS5Ab2AWlj@vrbo.5qo0h.mongodb.net/test';
    
    try {
        
       await mongoose.connect(mongoURI);
       console.log('Database connected');
    } catch (error) {
        console.log(`Database connection failed ${error}`)
    }
}

module.exports = connectDatabase;