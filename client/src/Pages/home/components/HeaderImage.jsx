import React from 'react';
import starts from '../assets/Group 6.svg';
import start1 from '../assets/16.svg';
import start2 from '../assets/13.svg';
//import arrow from '../assets/35.svg';
import hat from '../assets/Group 5.svg';
import girl from '../assets/undraw_education_f8ru 1.svg';
import background from '../assets/Group 9.svg';

const HeaderImage = () => {
  return (

    <div className='relative m-auto w-full xsm:w-[25rem] h-[15rem] lg:w-[35rem] lg:h-[30rem] xl:w-[40rem] xl:h-[40rem] slide-left'>
        <img
            src={background}
            alt="background"
            className='absolute top-[-18%] lg:top-0 xl:top-[-15%] m-auto z-[-1] w-full h-auto xsm:w-[22rem] xsm:h-[22rem] lg:w-[30rem] lg:h-[30rem] xl:w-[35rem] xl:h-[35rem]'
        />
        <img 
            src={starts} 
            alt="starts" 
            className='scale-up-center-hover z-[1] absolute w-[25%] h-[30%] lg:w-[30%] lg:h-[34%] right-0 top-[-1%]'
        />
        <img 
            src={start1} 
            alt="start 1" 
            className='scale-up-center-infinite-2 absolute left-0 xsm:left-[5%] top-[13.07%] lg:top-[20%] bottom-[79.97%]'
        />
        <img 
            src={start2} 
            alt="start 2" 
            className='scale-up-center-infinite-1 absolute left-[14.71%] top-[56.27%] bottom-[37.69%]'
        />
        {/* <img 
            src={arrow} 
            alt="arrow" 
            className='scale-up-center-hover z-[1] absolute left-[43%] right-[44.29%] top-[0.33%] '
        /> */}

        <img 
            src={hat} 
            alt="hat" 
            className='rotate-scale-up-hover z-[1] absolute w-[34px] h-[34px]  xsm:w-[42px] xsm:h-[42px] lg:w-[58.31px] lg:h-[51.22px] xl:w-[69px] xl:h-[60px] left-[30%] xl:left-[27%] top-[12%] lg:top-[30%] xl:top-[10%] '
        />
        <img 
            src={girl} 
            alt="girl" 
            className=' z-[0] absolute left-[4rem] xsm:left-[6rem] lg:left-[7.5rem] w-[13rem] xsm:w-[15rem] lg:w-[21rem] xl:w-[25rem] h-auto m-auto top-[9%] xsm:top-[20%] xl:top-[-30%] bottom-[9%] lg:bottom-0'
        />
    </div>
  )
}

export default HeaderImage;