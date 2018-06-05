const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipecontroller')
const usercontroller = require('../controllers/usercontroller')
const authcontroller = require('../controllers/authcontroller')
const verifyToken = require('../controllers/verifyToken');

//RECIPE ROUTES
router.get('/recipe/get', verifyToken, recipeController.getAllRecipees)
router.post('/recipe', verifyToken, recipeController.postRecipe)
router.put('/recipe/update/:id', verifyToken, recipeController.updateRecipe)
router.delete('/recipe/delete/:id', verifyToken, recipeController.deleteRecipe)
router.get('/recipe/get/:id', recipeController.getSingleRecipe)


//USER ROUTES
router.post('/user/post', usercontroller.postNewUser);
router.get('/user/get', usercontroller.getAllUser);
router.get('/user/get/:id', usercontroller.getSingleUser);
router.delete('/user/delete/:id', usercontroller.deleteSingleUser);

//REGISTER,LOGIN AND GET TOKENS ROUTESs
router.post('/register', authcontroller.registerUser);
//router.get('/gettoken', authcontroller.getToken);
router.post('/login', verifyToken, authcontroller.loginUser)

module.exports =  router