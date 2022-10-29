import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Navbar, Footer } from './components/index.js'
import { Home, Graduate, Undergraduate, Explore, Ratings } from './Pages/index.js'

const App = () => {
  return (
      <BrowserRouter>
        <Navbar/>
        <div className='h-[100px] xl:h-[120px]'></div>
        <div className='px-7 xsm:px-10 sm:px-12 lg:px-16 2xl:px-20 overflow-x-clip'>
          <Routes>
            <Route path="/" element={<Home></Home>}/>
            <Route path="/graduate" element={<Graduate></Graduate>}/>
            <Route path="/undergraduate" element={<Undergraduate></Undergraduate>}/>
            <Route path="/explore" element={<Explore></Explore>}/>
            <Route path="/ratings" element={<Ratings></Ratings>}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
  )
}

export default App
