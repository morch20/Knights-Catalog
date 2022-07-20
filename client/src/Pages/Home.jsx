import React from 'react'
import { ReactComponent as Logo } from '../assets/header.svg'

const Home = () => {
  return (
    <>
      <header className='header__gradient__light flex my-8 sm:my-12 mx-4 sm:mx-[3rem] md:mx-[4.5rem] md:justify-between'>

        <div className=' md:pr-10 '>

          <h1 className=' font-semibold text-[2.5rem] flex flex-col md:flex-row'>
            <span>
              Step Up Your
            </span> 
            <span className='text-[color:var(--yellow)] pl-4'>
              Education
            </span>
          </h1>

          <p className=' font-normal text-base text-[color:var(--secondary__light)] mt-8'>
            Stairs brings together your team's working docs and important discussions. 
            Move projects faster, work more asynchronously, and feel connected
          </p>

        </div >

        <div className=' px-5 hidden md:block'>
          <Logo/>
        </div>

      </header>

    </>
  )
}

export default Home