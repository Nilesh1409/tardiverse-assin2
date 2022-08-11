const express = require("express");
const { addBook, searchBook, addUserBook, getUserBooks } = require("../handler/book");

const books = express.Router();

books.post('/add',addBook)
books.get('/search',searchBook)
books.post('/userbook',addUserBook)
books.get('/userbooklist',getUserBooks)

module.exports = books