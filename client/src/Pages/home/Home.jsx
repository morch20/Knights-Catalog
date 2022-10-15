import React, { useEffect } from 'react';
import { HeaderImage, Card, DeskGirl } from './components/index.js';
import { SearchBar } from '../../components/index.js';
import arrow from '../../assets/57.svg';
import compareIcon from './assets/compare-svgrepo-com 1.svg';
import checkIcon from './assets/Check Icon.svg';
import ratingIcon from './assets/rating-rate-svgrepo-com 1.svg';
import AOS from 'aos';

const Home = () => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

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
            <button className=' my-8 rounded-lg bg-[color:var(--yellow)] font-semibold text-[color:var(--text-secondary-light)] hover:text-white w-40 h-11 lg:h-12 lg:text-lg active:bg-yellow-300'>
              Start Here!
            </button>
              <img src={arrow} alt='arrow' className='w-20 h-20 absolute right-[-5rem] md:right-[-6rem]'></img>
          </div>

        </div >

        <HeaderImage/>

      </header>

      <main>
        <section data-aos='fade-up' data-aos-duration='2000' className='relative'>
          <div className='bg-[#e9ebf0] absolute h-full w-screen z-[-1] top-0 left-[-1.75rem] xsm:left-[-2.5rem] sm:left-[-3rem] lg:left-[-4rem] '>
          </div>

          <div className='text-center pt-10 sm:pt-14 '>
            <h3 className=' text-2xl xsm:text-3xl font-semibold'>
              Advance Tools
            </h3>

            <p className=' text-[color:var(--text-secondary-light)] mt-4 lg:text-lg xl:text-xl'>
              Save time by having everything in one platform
            </p>
          </div>

          <div className=' w-full flex flex-col md:flex-row items-center justify-center mt-10 sm:mt-20 md:mt-28'>
            <Card
              title='Compare Programs'
              text='Drive performance and your cress-functional collaborating with easy-to boards'
              iconURL={compareIcon}
              iconAlt='compare icon'
            />
            <Card
              title='Check Courses'
              text='Drive performance and your cress-functional collaborating with easy-to boards'
              iconURL={checkIcon}
              iconAlt='check icon'
            />            
            <Card
              title='Rate Courses'
              text='Drive performance and your cress-functional collaborating with easy-to boards'
              iconURL={ratingIcon}
              iconAlt='rating icon'
              last
            />
          </div>

        </section>

        <section className='flex flex-col md:flex-row justify-center md:justify-between items-center my-20 w-full h-full '>

          <div
            data-aos-duration="2000" 
            data-aos="fade-up-right" 
            className='w-full md:w-[50%] h-full flex flex-col mb-12 md:m-0'
          >

            <div className='mb-10 relative'>
              <h1 className=' text-center text-2xl xsm:text-3xl font-semibold mb-3'>
                Start Searching Now!
              </h1>
              <div className='bg-[color:var(--yellow)] w-[80%] h-1 absolute left-1/2 translate-x-[-50%]'></div>
            </div>

            <div data-aos="fade-up-left"  data-aos-duration="1000">
              <SearchBar className='w-full h-10 ' endpoint={'search'}/>
            </div>

          </div>

          <div data-aos="fade-up-left"  data-aos-duration="2000" className=' -z-10'>
            <DeskGirl/>
          </div> 

        </section>

      </main>

    </>
  )
}

export default Home;