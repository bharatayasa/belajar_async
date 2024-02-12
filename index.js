const express = require('express');
const dotenv = require('dotenv');
const router = require('./route/endpoint');

const app = express(); 
app.use(express.json());
app.use(router);
dotenv.config(); 

const port = process.env.PORT || 5000; 
const host = process.env.HOST; 

app.listen(port, host, () => {
    console.log(`server up and running at http://${host}:${port}`);
})
