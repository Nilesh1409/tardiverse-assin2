const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    }
})

const book = mongoose.model('book',bookSchema);

module.exports = book;