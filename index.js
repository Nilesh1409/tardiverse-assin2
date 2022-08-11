const express = require('express');
const cors = require('cors');
const connectDatabase = require('./database');
const book = require('./router/book')
const userRouter = require('./router/user')

const app = express();

app.use(cors());
app.use(express.json())
app.use((req,res,next) =>{
    console.log('request receive')
    console.log(req.body)
    next()
})

app.use(book);
app.use(userRouter);

connectDatabase()
.then(()=>
app.listen(8080,()=> console.log('Started listning'))
)
.catch((err) => console.log(err));