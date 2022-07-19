import React from 'react'
import { useState } from 'react';
import {ReactComponent as Logo} from '../assets/Logo-text.svg'
import { Sling as Hamburger } from 'hamburger-react'

const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false);

  const links = (
    <>
      <li className='m-5 nav__links__animation '>Undergraduate</li>
      <li className='m-5 nav__links__animation'>Graduate</li>
      <li className='m-5 nav__links__animation'>Ratings</li>
      <li className='my-5 nav__links__animation pb-1 px-5 rounded bg-[color:var(--yellow)] hover:text-white'>Explore</li>
      <li className='m-5 nav__links__animation text-[color:var(--yellow)]'>UCF Website</li>
    </>
  )

  return (
    
    <div className={(toggleMenu) ? 'w-full fixed' : 'w-full fixed bg__blur'}>

      <nav className='flex items-center justify-between h-full px-4 sm:px-[3rem] md:px-[4.5rem] pt-8'>

        <Logo/>

        <div className='hidden lg:block'>

          <ul className='flex font-semibold lg:text-base w-full'>
            {links}
          </ul>

        </div>

        <div className={(toggleMenu) ? 'bg__glass absolute h-fit top-[35px] w-full lg:hidden' : 'flex items-center lg:hidden'}>
          {
            !toggleMenu &&
            <>
              <a href='#' className='hidden rounded sm:block pb-1 px-3 mr-8 font-semibold bg-[color:var(--yellow)] hover:text-white'>Explore</a>
              <a href='#' className='hidden nav__links__animation sm:block px-3 mr-8 font-semibold text-[color:var(--yellow)]'>UCF Website</a>
            </>
          }

          <Hamburger
            size={25}
            duration={0.7}
            onToggle={toggled => {

              if(toggled){
                setToggleMenu(true)
              }

              else{
                setToggleMenu(false)
              }
            }}
          />

          {
            toggleMenu &&
            <div data-aos="zoom-out-left" className='w-full'>
              <ul className='font-semibold text-base w-fit mx-6'>
                {links}
              </ul>

            </div>
          }
        </div>

      </nav>

      <hr className='bg-[#D9D9D9] w-[80%] ml-6 sm:ml-14 sm:w-[90%]'/>

    </div>
  )
}

export default Navbar