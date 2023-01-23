import React from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Navbar, Footer } from './components/index.js'
import { Home, ComparePrograms, Explore, Ratings, DynamicPage } from './Pages/index.js'

const App = () => {

  fetch('http://localhost:5000/undergraduate/codes')
    .then(response => response.json())
    .then(data => {

        const temp = {};

        for (const key in data) {
            if (Object.hasOwnProperty.call(data, key)) {
                const element = data[key];
                temp[key.substring(0, 3)] = element; 
            }
        }
        sessionStorage.setItem('codes', JSON.stringify(temp));
    })
    .catch(e => console.log(e));

  return (
      <BrowserRouter>
        <Navbar/>
        <div className='h-[100px] xl:h-[120px]'></div>
        <div className='px-7 xsm:px-10 sm:px-12 lg:px-16 2xl:px-20 overflow-x-clip'>
          <Routes>
            <Route path="/" element={<Home></Home>}/>
            <Route path="/compare_programs" element={<ComparePrograms />}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/ratings" element={<Ratings/>}/>
            <Route path='/:id' element={<DynamicPage />}/>
          </Routes>
        </div>
        <Footer/>
      </BrowserRouter>
  )
}

export default App
