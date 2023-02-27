import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const RecipeForm = ({
  heading,
  recipeTitle = '',
  recipeCookingTime = 0,
  isUpdating = false,
  recipeId,
}) => {
  const navigate = useNavigate()

  const [title, setTitle] = useState(recipeTitle)
  const [cookingTime, setCookingTime] = useState(recipeCookingTime)

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch(
        `http://localhost:5005/api/recipes${isUpdating ? `/${recipeId}` : ''}`,
        {
          method: isUpdating ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, cookingTime }),
        }
      )
      if (response.status === 201) {
        const parsed = await response.json()
        navigate(`/recipes/${parsed._id}`)
      }
      if (response.status === 200) {
        navigate(`/recipes/${recipeId}`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (cookingTime < 0) {
      setCookingTime(0)
    }
  }, [cookingTime])

  return (
    <>
      <h1>{heading}</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input type='text' value={title} onChange={event => setTitle(event.target.value)} />
        </label>
        <label>
          Cooking Time
          <input
            type='number'
            value={cookingTime}
            onChange={event => setCookingTime(event.target.value)}
          />
        </label>
        <button type='submit'>{isUpdating ? 'Update' : 'Create'}</button>
      </form>
    </>
  )
}

export default RecipeForm
