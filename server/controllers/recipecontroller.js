const express = require('express');
const bodyParser = require('body-parser');
const Recipe = require('../models/recipe')
//RETURN ALL RECIPES
exports.getAllRecipees = (req, res) => {
    Recipe.find({}, (err, recipe) => {
        if(recipe){
            res.json(recipe)
        }
    })
}
//RETURN A SINGLE RECIPE
exports.getSingleRecipe = (req, res) => {
   Recipe.findById(req.params.id, (err, recipe) => {
       if(err)
       return res.status(500).send('There is an error finding this recipe');
       if(!recipe)
       return res.status(404).send('Not found');
       res.status(200).send(recipe)
   }) 
}
//POST RECIPE
exports.postRecipe = ( req, res) => {
    Recipe.create({
        foodName : req.body.foodName,
        procedure : req.body.procedure,
        ingredient : req.body.ingredient
    },
    (err, recipe) => {
    if(err)
    return res.status(500).send('Problem posting the recipe');
    res.status(200).send(recipe)
})
}
//UPDATE RECIPE
exports.updateRecipe = (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id,(err, recipe) => {
        if(err)
        return res.status(500).send('There is a problem updating this recipe');
        res.status(200).send(recipe)
    })
}
//DELETE RECIPE
exports.deleteRecipe = (req, res) => {
    Recipe.findByIdAndRemove(req.params.id,(err, recipe) => {
        if(err)
        return res.status(500).send('Unable to delete recipe');
        res.status(200).send('You have successfully deleted ' + recipe)
    })
}