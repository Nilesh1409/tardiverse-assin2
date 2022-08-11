const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
    },
    email : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    book :[ {
        type : mongoose.Schema.Types.ObjectId,
        ref  : 'book',
    }]
})

const newUser = mongoose.model('newUser',userSchema);

module.exports = newUser;