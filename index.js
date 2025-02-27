require('dotenv').config();

const express = require('express');
const mongoose=require('mongoose');
const app = express();
const mainRouter = require('./routes/main');
const notFoundMiddleware = require('./middleware/not-found');

// middleware
// app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1', mainRouter);
app.use(notFoundMiddleware);



const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    console.log(e);
})
app.listen(port,"0.0.0.0",()=>{
    console.log(`connected at port ${port}`);
})
