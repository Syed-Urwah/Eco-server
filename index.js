const express = require('express');
const dotenv = require('dotenv').config();
const connectToDB = require('./db')
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

const app = express();

connectToDB();

app.get('/', ()=>{
    console.log("hello")
})

app.use(express.json());

app.use('/api/auth', authRoute );
app.use('/api/user', userRoute );


app.listen(8000, ()=>{
    console.log("server is running")
})