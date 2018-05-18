const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const app = express()
const routes = require('./routes/routes')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use('/', routes)
//PORT
const port = 8000;
app.listen(port,() =>{
    console.log(`Recipe app is listening to ${port}`)
})

//DATABASE CONNECTION
mongoose.connect('mongodb://otitoju:sci15csc067@ds125680.mlab.com:25680/customer');