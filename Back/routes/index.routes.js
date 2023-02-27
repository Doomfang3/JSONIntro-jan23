const Recipe = require('../models/Recipe.model')

const router = require('express').Router()

router.get('/', (req, res, next) => {
  res.json('All good in here')
})

router.get('/recipes', async (req, res, next) => {
  // Get all recipes
  const allRecipes = await Recipe.find()
  res.json(allRecipes)
})

router.get('/recipes/:recipeId', async (req, res, next) => {
  const { recipeId } = req.params
  try {
    // Get one recipe
    const recipe = await Recipe.findById(recipeId)
    res.json(recipe)
  } catch (error) {
    console.log(error)
  }
})

router.post('/recipes', async (req, res) => {
  const newRecipeData = req.body
  console.log(newRecipeData)
  const newRecipe = await Recipe.create(newRecipeData)
  res.status(201).json(newRecipe)
})

router.put('/recipes/:recipeId', async (req, res) => {
  const { recipeId } = req.params
  const updateRecipeData = req.body
  console.log(updateRecipeData)
  await Recipe.findByIdAndUpdate(recipeId, updateRecipeData)
  res.json({ message: 'Recipe updated properly' })
})

router.delete('/recipes/:recipeId', async (req, res, next) => {
  const { recipeId } = req.params
  try {
    // Delete one recipe
    await Recipe.findByIdAndDelete(recipeId)
    res.json({ message: 'Recipe deleted properly' })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
