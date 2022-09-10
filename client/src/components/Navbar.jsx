import React from 'react';
import { useState } from 'react';
import logo from '../assets/Logo-text.svg';
import { Sling as Hamburger } from 'hamburger-react';
import { CustomLink } from './navigation/index.js';
import { Link } from 'react-router-dom';
import useOutsideClick from '../hooks/useOutsideClick.js';

const Navbar = () => {

  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleHamburger, setToggleHamburger] = useState(false);

  const ref = useOutsideClick( () => {
    handleLinkClicked();
  });

  const handleLinkClicked = () =>{
    setToggleHamburger(false);
    setToggleMenu(false)
  }


  const links = (
    <>
      <li className='m-5' onClick={handleLinkClicked}>
        <CustomLink 
          to='/undergraduate'
          className='nav__links__animation' 
          text='Undergraduate'
        />
      </li>
      <li className='m-5' onClick={handleLinkClicked}>
        <CustomLink 
            to='/graduate'
            className='nav__links__animation' 
            text='Graduate'
          />
      </li>
      <li className='m-5' onClick={handleLinkClicked}>
        <CustomLink 
            to='/ratings'
            className='nav__links__animation' 
            text='Ratings'
          />
      </li>
      <li className='my-5' onClick={handleLinkClicked}>
        <CustomLink 
            to='/explore'
            className=' nav__links__animation pb-1 px-5 rounded bg-[color:var(--yellow)] hover:text-white' 
            text='Explore'
          />
      </li>
      <li className='m-5 nav__links__animation text-[color:var(--yellow)]' onClick={handleLinkClicked}>
        <a href="https://www.ucf.edu/" target= "_blank" rel="noreferrer">
          UCF Website
        </a>
      </li>
    </>
  )

  return (
    
    <div className={(toggleMenu) ? 'w-full fixed z-10' : 'w-full fixed bg__blur z-10'}>

      <nav className='flex items-center justify-between h-full px-4 xsm:px-[2rem] sm:px-[3rem] md:px-[4.5rem] pt-8 lg:pt-4'>

        <Link to='/'>
          <img src={logo} className='2xl:w-[234px] 2xl:h-[84px]' alt='logo'></img>
        </Link>

        <div className='hidden lg:block'>

          <ul className='flex font-semibold lg:text-base w-full'>
            {links}
          </ul>

        </div>

        <div ref={ref} className={(toggleMenu) ? 'bg__glass absolute h-fit top-[35px] w-full lg:hidden' : 'flex items-center lg:hidden'}>
          {
            !toggleMenu &&
            <>   
              <CustomLink
                to='/explore'
                text='Explore'
                className=' relative hidden w-fit rounded sm:block pb-1 px-3 mr-8 font-semibold bg-[color:var(--yellow)] hover:text-white'
              />
              <a 
                href="https://www.ucf.edu/"
                target= "_blank" 
                rel="noreferrer"
                className='hidden nav__links__animation sm:block px-3 mr-8 font-semibold text-[color:var(--yellow)]'
              >
                  UCF Website
              </a>
            </>
          }

          <Hamburger
            toggled={toggleHamburger}
            toggle={setToggleHamburger}
            size={25}
            duration={0.7}
            onToggle={toggled => {

              if(toggled){
                setToggleMenu(true);
              }

              else{
                setToggleMenu(false);
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