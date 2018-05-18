const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const recipe = require('./recipe');

//POST RECIPE
router.post('/', (req,res) => {
    recipe.create({
        foodName : req.body.foodName,
        procedure : req.body.procedure,
        ingredient : req.body.ingredient
    },(err,recipe)=>{
        if(err)
        return res.status(500).send('There is a problem posting this recipe');
        res.status(200).send(recipe);
    })
})
//RETURN ALL THE FOOD IN THE DATABASE
router.get('/', (req,res) => {
    recipe.find({},(err,recipes) => {
        if(err)
        return res.status(500).send('There is a problem getting  the recipes');
        res.status(200).send(recipes);
    }) 
})
//RETURN A SINGLE RECIPE FROM DATABASE
router.get('/:id', (req,res) => {
    recipe.findById(req.params.id,(err,recipe) => {
        if(err)
        return res.status(500).send('Problem finding this recipe');
        if(!recipe)
        return res.status(404).send('Not found');
        res.status(200).send(recipe);
    })
})
//UPDATE RECIPES
router.put('/', (req,res) => {
    recipe.findByIdAndUpdate(req.params.id,(err,recipe) =>{
        if(err)
        return res.status(500).send('Problem updating recipes')
        res.status(200).send(recipe);

    })
})
//DELETING RECIPES
router.delete('/', (req,res) => {
    recipe.findByIdAndDelete(req.params.id,(err,recipe) =>{
        if(err)
        return res.status(500).send("Unable to delete selected recipe");
        res.status(200).send('you have deleted '+ recipe.foodName )
    })
})
module.exports = router;