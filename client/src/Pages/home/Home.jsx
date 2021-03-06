import React from 'react';
import { HeaderImage } from './components/index.js';
import arrow from '../../assets/arrow.svg';

const Home = () => {
  return (
    <>
      <header className='header__gradient__light flex lg:py-0 2xl:pt-20 pl-4 md:pl-[4.5rem] xsm:justify-center md:justify-between'>

        <div>

          <h1 className=' font-semibold text-[2.5rem] !m-0 pl-4 flex flex-col md:pl-0 2xl:flex-row w-fit'>
            <span>
              Step Up Your
            </span> 
            <span className='text-[color:var(--yellow)]'>
              Education
            </span>
          </h1>

          <p className=' max-w-[30rem] 2xl:max-w-[45rem] pl-5 md:px-0 md:pr-20 font-normal text-base text-[color:var(--text-secondary-light)] mt-4 xsm:mt-8'>
            Stairs brings together your team's working docs and important discussions. 
            Move projects faster, work more asynchronously, and feel connected
          </p>

          <div className='flex'>
            <button className=' ml-5 sm:ml-0 my-16 md:my-10 lg:my-24 mr-4 rounded-[14px] bg-[color:var(--yellow)] font-bold text-white w-40 h-11 scale-up-center-active '>
              Start Here!
            </button>
              <img src={arrow} className='w-20 h-20 lg:mt-3 lg:w-fit lg:h-fit'></img>
          </div>

        </div >

        <div className=' lg:px-5 hidden sm:block md:w-[50%] md:h-[50%] 2xl:w-[40%] 2xl:h-[40%] pt-10 md:mr-16 lg:mr-20'>
          <HeaderImage></HeaderImage>
        </div>

      </header>

    </>
  )
}

export default Home;