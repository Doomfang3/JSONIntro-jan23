import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import RecipeForm from '../components/RecipeForm'

const UpdateRecipePage = () => {
  const { recipeId } = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [recipe, setRecipe] = useState()

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:5005/api/recipes/${recipeId}`)
      const parsed = await response.json()
      setRecipe(parsed)
      setIsLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [recipeId])

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : (
    <RecipeForm
      heading='Update recipe'
      recipeTitle={recipe.title}
      recipeCookingTime={recipe.cookingTime}
      isUpdating
      recipeId={recipeId}
    />
  )
}

export default UpdateRecipePage
