const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipecontroller')
const usercontroller = require('../controllers/usercontroller')
const authcontroller = require('../controllers/authcontroller')
const verifyToken = require('../verifyToken');

//RECIPE ROUTES
router.get('/recipes', recipeController.getAllRecipees)
router.post('/recipes', recipeController.postRecipe)
router.put('/recipes/update/:id', recipeController.updateRecipe)
router.delete('/recipes/delete/:id',recipeController.deleteRecipe)


//USER ROUTES
router.post('/user/post', usercontroller.postNewUser);
router.get('/user/get', usercontroller.getAllUser);
router.get('/user/get/:id', usercontroller.getSingleUser);

//REGISTER,LOGIN AND GET TOKENS ROUTESs
router.post('/register', authcontroller.registerUser);
router.get('/gettoken',verifyToken, authcontroller.getToken);
router.post('/login', authcontroller.loginUser)

module.exports =  router