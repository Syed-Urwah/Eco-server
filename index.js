const express = require('express');
const dotenv = require('dotenv').config();
const connectToDB = require('./db')
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const cors = require('cors');

const app = express();

connectToDB();

app.get('/', ()=>{
    console.log("hello")
})

app.use(cors())
app.use(express.json());

app.use('/api/auth', authRoute );
app.use('/api/user', userRoute );
app.use('/api/product', productRoute );
app.use('/api/cart', cartRoute );


app.listen(8000, ()=>{
    console.log("server is running")
})