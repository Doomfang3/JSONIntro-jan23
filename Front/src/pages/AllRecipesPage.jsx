import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const AllRecipesPage = () => {
  const [recipes, setRecipes] = useState([])

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:5005/api/recipes')
      const parsed = await response.json()
      setRecipes(parsed)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchRecipes()
  }, [])

  return (
    <>
      <h1>All recipes</h1>
      <ul>
        {recipes.map(recipe => (
          <li key={recipe._id}>
            <Link to={`/recipes/${recipe._id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default AllRecipesPage
