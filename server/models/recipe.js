const mongoose = require('mongoose')
//DATABASE TABLE FOR RECIPES
const recipeSchema = new mongoose.Schema({
    foodName :String,
    procedure :String,
    ingredient :String
})
mongoose.model('recipe', recipeSchema);
module.exports = mongoose.model('recipe');