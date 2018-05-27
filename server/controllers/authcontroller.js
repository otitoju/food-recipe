const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const config = require('../config')
const verifyToken = require('../verifyToken')

//USER REGISTRATION FORM
exports.registerUser = (req, res) => {
    const body = req.body;
    const hashPassword = bcrypt.hashSync(req.body.password);
    user.create({
        name:body.name,
        username:body.username,
        email:body.email,
        passwoord:hashPassword
    }, 
    (err,user) => {
        if (err){
            res.json({
                message:`Error from the server please try again`   
            })
        }
        if (!body.name && !body.username && !body.email && !body.passwoord){
            res.json({
                message:`Please fill in all required fields`
            })
        }
        else if (body.name > 20 && body.username > 20){
            res.json({
                message:`Name and username should not be more than 20`
            })
        }
        else if (body.passwoord < 8){
            res.json({
                message:`Password must be more than 8 `
            })
        }
        else{
            //creating a token for the users
            const token = jwt.sign({id:user.id}, config.secret, {expiresIn})
            res.json({
                message:`Registration successful`,
                auth:true,
                token:token
            })
        }
    })
}
// GET THE REAL ID BACK FROM THE TOKEN GENERATED
exports.getToken = (req, res, next) => {
    const token = req.headers['x-access-token'];
    if (!token) {
        res.json({
            auth:false,
            message:`No token found `
        })
    }
    else{
        //Verify the token first
        jwt.verify(token, config.secret, (err, decoded) =>{
            if (err){
                res.json({
                    message:`Error in token validation`
                })
            }
            else{
                user.findById(req.userId,{password:0}, (err, user) => {
                    if (user){
                        res.json(user)
                    }
                })
            }
        })
    }
}
//LOGIN USERS
exports.loginUser = (req, res)=> {
    user.findOne({email:req.body.email}, (err, user) => {
        if (err){
            res.json(`An error occur when trying to login`)
        }
        else {
            const passwordIsValid = bcrypt.compareSync({password:req.body.password},user.password);
            if (!passwordIsValid){
                res.json({
                    auth:false,
                    token:null,
                    message:`Incorrect password or user`
                })
            }
            else {
                const token = jwt.sign({id:user.id}, config.secret)
                res.json({
                    auth:true,
                    token:token
                })
            }
        }
    })
}