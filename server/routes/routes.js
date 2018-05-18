const express = require('express');
const router = express.Router();
const recipeController = require('../controllers/recipecontroller')

router.get('/recipes', recipeController.getAllRecipees)
router.post('/recipes', recipeController.postRecipe)
router.put('/:id', recipeController.updateRecipe)
router.delete('/:id',recipeController.deleteRecipe)

module.exports =  router