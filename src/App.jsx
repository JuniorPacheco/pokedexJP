import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Login from './components/Login'
import Pokedex from './components/Pokedex'
 
function App() {

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/' element={<Layout />}>
          <Route path='pokedex' element={<Pokedex />}/>
        </Route>
      </Routes>


    </div>
  )
}

export default App
