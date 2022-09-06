import React from 'react';
import { HeaderImage } from './components/index.js';
import arrow from '../../assets/57.svg';

const Home = () => {
  return (
    <>
      <header className=' flex flex-col-reverse md:flex-row lg:py-0 2xl:pt-20 xsm:justify-center md:justify-between min-w-full'>

        <div className='flex flex-col items-center text-center md:items-start md:text-left mt-8 xsm:mt-14 xl:mt-1'>

          <h1 className=' leading-tight font-semibold text-[2.5rem] lg:text-[3.5rem] !m-0 flex flex-col w-fit slide-right'>
            <span>
              Step Up Your
            </span> 
            <span className='text-[color:var(--yellow)]'>
              Education
            </span>
          </h1>

          <p className=' max-w-[25rem] 2xl:max-w-[45rem] lg:text-lg xl:text-xl font-normal text-base text-[color:var(--text-secondary-light)] mt-10 lg:mt-14 xsm:mt-14 md:mt-8'>
            Build your brand's recognition and get detailed insights on how your
            links are performing .
          </p>

          <div className='flex slide-up relative'>
            <button className=' my-8 rounded-lg bg-[color:var(--yellow)] font-bold text-white w-40 h-11 lg:h-12 lg:text-lg hover:bg-yellow-300'>
              Start Here!
            </button>
              <img src={arrow} className='w-20 h-20 absolute right-[-5rem] md:right-[-6rem]'></img>
          </div>

        </div >

        <HeaderImage/>

      </header>

    </>
  )
}

export default Home;