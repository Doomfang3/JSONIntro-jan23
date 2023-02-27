import { Route, Routes } from 'react-router-dom'
import './App.css'
import AllRecipesPage from './pages/AllRecipesPage'
import NewRecipePage from './pages/NewRecipePage'
import RecipePage from './pages/RecipePage'
import UpdateRecipePage from './pages/UpdateRecipePage'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/recipes' element={<AllRecipesPage />} />
        <Route path='/recipes/:recipeId' element={<RecipePage />} />
        <Route path='/recipes/new' element={<NewRecipePage />} />
        <Route path='/recipes/update/:recipeId' element={<UpdateRecipePage />} />

        <Route path='*' element={<h1>404 Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App
