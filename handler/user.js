const jwt = require('jsonwebtoken');
const newUser = require('../database/user');

async function createUser(req,res){
   
    try {
        let {name,email,password} = req.body;
        let userData ={name,email,password};
        if(name == "" || email == "" || password == ""){
            res.status(400).send({"message" : "please enter all the fields"})
            return;
        }
        
        let userFromDb = await newUser.create(userData);
        res.status(201).send(userFromDb);
    } catch (error) {
        res.status(400).send({"messege" : "something went wrong"})
    }

}

let SECRET = "KJLDFKHG87DS9D89EW"

async function login(req,res){
    console.log('inlogin')
    try {
        let {email,password} = req.body;
        let userData ={email,password};
        if(email == "" || password == ""){
            res.status(400).send({"message" : "please enter all the fields"})
            return;
        }
          
        
        let userFromDb = await newUser.findOne({"email" : email});
        
        if(userFromDb == null){ 
            res.status(400).send({"message" : "user not found"})
            return;
        }
        if(userFromDb.password != password){
            res.status(400).send({"message" : "password is incorrect"})
            return;
        }
        let token = jwt.sign({email : userFromDb.email, _id : userFromDb._id},SECRET);

        res.status(201).send({"token" : token});
    } catch (error) {
        res.status(400).send({"messege" : "something went wrong"})
    }
}

module.exports = {createUser,login};