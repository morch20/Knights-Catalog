import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import { Home } from './Pages'

const App = () => {
  return (
  <div className='bg-[color:var(--light)]'>
    <BrowserRouter>
      <Navbar/>
      <div className='h-[100px] xl:h-[120px]'></div>
      <Routes>
        <Route path="/" element={<Home></Home>}/>
      </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
