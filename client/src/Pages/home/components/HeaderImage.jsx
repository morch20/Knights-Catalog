import React from 'react';
import starts from '../assets/Group 6.svg';
import start1 from '../assets/16.svg';
import start2 from '../assets/13.svg';
import arrow from '../assets/35.svg';
import hat from '../assets/Group 5.svg';
import girl from '../assets/undraw_education_f8ru 1.svg';

const HeaderImage = () => {
  return (

    <div className='relative w-[350px] h-[300px] lg:w-[500px] lg:h-[365px] slide-left'>
        <img 
            src={starts} 
            alt="starts" 
            className='scale-up-center-hover z-[1] absolute w-[30%] h-[30%] lg:w-[157.42px] lg:h-[112.79px] right-[0%] top-[1%]'
        />
        <img 
            src={start1} 
            alt="start 1" 
            className='scale-up-center-infinite-2 absolute left-[12%] lg:left-[7.65%] top-[13.07%] bottom-[79.97%]'
        />
        <img 
            src={start2} 
            alt="start 2" 
            className='scale-up-center-infinite-1 absolute left-[20%] lg:left-[14.71%] top-[56.27%] bottom-[37.69%]'
        />
        <img 
            src={arrow} 
            alt="arrow" 
            className='scale-up-center-hover z-[1] absolute left-[47.83%] right-[44.29%] top-[0.33%] '
        />

        <img 
            src={hat} 
            alt="hat" 
            className='rotate-scale-up-hover z-[1] absolute w-[40.31px] h-[38.58px] md:w-[50px] md:h-[43px] lg:w-[58.31px] lg:h-[51.22px] left-[30%] top-[12%] '
        />
        <img 
            src={girl} 
            alt="girl" 
            className=' z-[0] absolute w-[60%] h-[60%] md:w-[75%] md:h-[75%] lg:w-fit lg:h-fit left-[22.75%] right-[14.99%] top-[9.07%] bottom-[9.07%]'
        />
    </div>
  )
}

export default HeaderImage;