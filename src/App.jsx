import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Pokedex from './components/Pokedex'
import Pokemon from './components/Pokemon'
 
function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/' element={<Layout />}>
          <Route path='pokedex' element={<Pokedex />}/>
          <Route path='pokedex/:id' element={<Pokemon />}/>
        </Route>
      </Routes>


    </div>
  )
}

export default App
