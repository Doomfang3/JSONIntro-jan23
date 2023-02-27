import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const RecipePage = () => {
  const { recipeId } = useParams()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)
  const [recipe, setRecipe] = useState()

  const fetchRecipe = async () => {
    try {
      const response = await fetch(`http://localhost:5005/api/recipes/${recipeId}`)
      const parsed = await response.json()
      if (parsed === null) {
        navigate('/404')
      } else {
        console.log(parsed)
        setRecipe(parsed)
        setIsLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRecipe()
  }, [recipeId])

  const handleDelete = async () => {
    await fetch(`http://localhost:5005/api/recipes/${recipeId}`, {
      method: 'DELETE',
    })
    navigate('/recipes')
  }

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <>
      <h1>{recipe.title}</h1>
      <p>Cooking Time : {recipe.cookingTime}</p>
      <Link to={`/recipes/update/${recipe._id}`}>
        <button type='button'>Update</button>
      </Link>
      <button type='button' onClick={handleDelete}>
        Delete
      </button>
    </>
  )
}

export default RecipePage
