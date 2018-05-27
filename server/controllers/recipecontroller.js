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
//POST RECIPEs
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
        res.status(200).send(recipe)
    })
}