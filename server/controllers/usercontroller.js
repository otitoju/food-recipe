const bodyParser = require('body-parser');
const user = require('../models/user');

//GET ALL USERS
exports.getAllUser = async (req, res) => {
    const allUser = await user.find();
    res.json({
        message:`This are all the users in the database`,
        user:allUser
    })
}
//CREATE A USER
exports.postNewUser = async (req,res) => {
    const body = req.body;
    if (!body.name && !body.username && !body.email && !body.password){
        res.json({
            message:`Please fill in all fields`
        })
    }
    else if (body.name >40 && body.username > 10){
        res.json({
            message:`Name should not be more than 40 and username should not be more than 10`
        })
    }
    else if (password < 8){
        res.json({
            message:`Your password is less than 8`
        })
    }
    else {
        const newUser = await user.create({
            name:body.name,
            username:body.username,
            email:body.email,
            password:body.password
        })
        res.json({
            message:`Successfully created: `,
            user:newUser
        })
    }
}
//GET BACK A SINGLE USERs
exports.getSingleUser = async (req, res) => {
    const singleUser = await user.findById(req.params.id)
    if (!singleUser){
        res.json({
            message:`This user does not exist, check your details`
        })
    }
    else {
        res.json({
            message:`The user is: `,
            user:singleUser
        })
    }
}