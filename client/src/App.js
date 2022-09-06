import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Navbar from './components/Navbar.jsx'
import { Home, Graduate, Undergraduate, Explore, Ratings } from './Pages/index.js'

const App = () => {
  return (
      <BrowserRouter>
        <Navbar/>
        <div className='h-[100px] xl:h-[120px]'></div>
        <div className='mx-8 xsm:mx-10 sm:mx-12 lg:mx-16'>
          <Routes>
            <Route path="/" element={<Home></Home>}/>
            <Route path="/graduate" element={<Graduate></Graduate>}/>
            <Route path="/undergraduate" element={<Undergraduate></Undergraduate>}/>
            <Route path="/explore" element={<Explore></Explore>}/>
            <Route path="/ratings" element={<Ratings></Ratings>}/>
          </Routes>
        </div>
      </BrowserRouter>
  )
}

export default App
