const express = require('express');
const bodyParser = require('body-parser');
const Recipe = require('../models/recipe')
//RETURN ALL RECIPES
exports.getAllRecipees = async (req, res) => {
    const allRecipe = await Recipe.find()
    res.json(allRecipe);
}
//POST RECIPEs
exports.postRecipe = async ( req, res) => {
    let body = req.body;
    if (!body.foodName && !body.procedure && !body.ingredient) {
        res.json({
            message:`Please fill all require input`
        })
    }
    else {
        let postRecipe = await Recipe.create(req.body)
        res.json(postRecipe);
    }
   
}
//UPDATE RECIPE
exports.updateRecipe = (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, (err, recipe) => {
        if(err)
        return res.status(500).send('There is a problem updating this recipe');
        res.status(200).send(recipe)
    })
}
//DELETE RECIPE
exports.deleteRecipe = (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, recipe) => {
        if(err)
        return res.status(500).send('Unable to delete recipe');
        res.status(200).send(recipe)
    })
}
//FIND A SINGLE RECIPE
exports.getSingleRecipe = async (req, res) => {
    const singleRecipe = await Recipe.findById(req.params.id, (err, recipe) => {
        if(!singleRecipe){
            res.json({
                message:`No recipe found`
            })
        }
        else{
            res.json({
                message:`Recipe found`,
                Recipe:singleRecipe
            })
        }
    })
}