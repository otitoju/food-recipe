const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const user = require('../models/user');
const config = require('../config')
const verifyToken = require('./verifyToken')

//USER REGISTRATION FORM
exports.registerUser = async (req, res) => {
    const body = req.body;
    const hashpassword = bcrypt.hashSync(req.body.password,10);
    if (!body.name && !body.username && !body.email && !body.password){
        res.status(204).json({
            message:`Please fill all required fields`
        })
    }
    else if (body.password.length < 8){
        res.status(205).json({
            message:`reset password, Notice: Password must be more than 7`
        })
    }
    else if (body.name.length >20 && body.username.length > 20) {
        res.status(205).json({
            message:`Name or username is too long, it should'nt be more than 20 character`
        })
    }
    else {
        user.create({
            name:body.name,
            username:body.username,
            email:body.email,
            password:hashpassword
        })
        const token = jwt.sign({id:user.id,username:user.username,email:user.email,password:user.password},
        config.secret, {expiresIn:'2h'})
        res.status(200).json({
            message:`Registration successful`,
            auth:true,
            token:token
        })
    }

}
