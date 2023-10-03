import { useState } from 'react'
import {NavLink, Routes, Route} from 'react-router-dom' 
import axios from 'axios' 
import Home from './components/home'
import Navbar from './components/navbar'
import Documents from './components/documents'
axios.defaults.baseURL = 'http://localhost:5000' 

function App() {
  const [count, setCount] = useState(0)

  return (<>

    <Navbar /> 

    <Routes>
      <Route path="/" element = { < Home /> } /> 
      <Route path="/documents" element = {< Documents /> } /> 
    </Routes>
    </>
  )
}

export default App
