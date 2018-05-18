const express = require('express');
const app = express()
const recipecontroller = require('./Recipe/recipecontroller');
app.use('/recipee',recipecontroller)


//PORT
const port = 8000;
app.listen(port,() =>{
    console.log(`Recipe app is listening to ${port}`)
})

//DATABASE CONNECTION
const mongoose = require('mongoose');
mongoose.connect('mongodb://otitoju:sci15csc067@ds125680.mlab.com:25680/customer');