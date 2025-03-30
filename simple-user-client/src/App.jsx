import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Users from './components/Users'
import Update from './components/Update'

function App() {
  return (
    <>
    
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/users' element={<Users/>} ></Route>
        <Route path='/update/:id' element={<Update/>} ></Route>
        
      </Routes>
    </>
  )
}

export default App
