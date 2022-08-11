const express = require("express");
const book = require("../database/book");
const newUser = require("../database/user");
const jwt = require("jsonwebtoken");


async function addBook(req,res){
    let {name} = req.body;
    
    let bookFromDb = await book.create({name});
    try {
        res.status(201).send(bookFromDb);
    } catch (error) {
        res.status(400).send({"massege" : "something went wrong"})
    }

}

async function searchBook(req,res){
    
    try {
    let {title} = req.query;
    
    let data = await book.find({'name' : { $regex: title }});
    if(title == ""){
        res.status(400).send({"massege" : "please enter a title"})
        return;
    }
        res.status(200).send({"data" : data})
    } catch (error) {
        res.status(400).send({"massege" : "something went wrong"});
    }
    
}

async function addUserBook(req,res){
    let {token,book} = req.body;
      // decode token

    let decoded = jwt.verify(token, "KJLDFKHG87DS9D89EW");
    let {email} = decoded;

    
   
    try {
        if(email == "" || book == ""){
            res.status(400).send({"massege" : "please enter all the fields"})
            return;
        };
        let dbData = await newUser.findOneAndUpdate({"email" : email},{$push : {book : book}});
        if(dbData == null){
            res.status(400).send({"massege" : "user not found"})
            return;
        }
        res.status(201).send(dbData);
    } catch (error) {
        res.status(400).send({"massege" : "something went wrong"})
    }

}

async function getUserBooks(req,res){

    try {
        let {name} = req.query;
        
        
        if(name == ""){
            res.status(400).send({"massege" : "please enter a name"})
            return;
        }
        
        let data = await newUser.findOne({name : {$regex : name}}).populate('book');

        


        if(data == null){
            res.status(400).send({"massege" : "user not found"})
            return;
        }
        res.status(200).send({"data" : data.book})
        
    } catch (error) {
        res.status(400).send({"massege" : "something went wrong"})
    }
        

   

}

module.exports = {addBook,searchBook,addUserBook,getUserBooks}