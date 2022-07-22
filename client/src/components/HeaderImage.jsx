import React from 'react'
import starts from '../assets/home/Group 6.svg'
import start1 from '../assets/home/16.svg'
import start2 from '../assets/home/13.svg'
import arrow from '../assets/home/35.svg'
import hat from '../assets/home/Group 5.svg'
import girl from '../assets/home/undraw_education_f8ru 1.svg'

const HeaderImage = () => {
  return (
    // <div className='relative w-[510px] h-[375px] slide-left'>
    //     <img 
    //         src={starts} 
    //         alt="starts" 
    //         className='scale-up-center-hover z-[1] absolute w-[167.42px] h-[122.79px] left-[337.32px] top-[5px]'
    //     />
    //     <img 
    //         src={start1} 
    //         alt="start 1" 
    //         className='scale-up-center-hover absolute left-[7.65%] right-[87.88%] top-[13.07%] bottom-[79.97%]'
    //     />
    //     <img 
    //         src={start2} 
    //         alt="start 2" 
    //         className='scale-up-center-hover absolute left-[14.71%] right-[81.95%] top-[56.27%] bottom-[37.69%]'
    //     />
    //     <img 
    //         src={arrow} 
    //         alt="arrow" 
    //         className='scale-up-center-hover z-[1] absolute left-[47.83%] right-[44.29%] top-[0.33%] '
    //     />

    //     <img 
    //         src={hat} 
    //         alt="hat" 
    //         className='rotate-scale-up-hover z-[1] absolute w-[58.31px] h-[51.22px] left-[30%] top-[40.33px] '
    //     />
    //     <img 
    //         src={girl} 
    //         alt="girl" 
    //         className=' z-[0] absolute left-[22.75%] right-[14.99%] top-[9.07%] bottom-[9.07%]'
    //     />
    // </div>

    <div className='relative w-[400px] h-[300px] lg:w-[500px] lg:h-[365px] slide-left'>
    <img 
        src={starts} 
        alt="starts" 
        className='scale-up-center-hover z-[1] absolute w-[157.42px] h-[112.79px] left-[337.32px] top-[5px]'
    />
    <img 
        src={start1} 
        alt="start 1" 
        className='scale-up-center-hover absolute left-[7.65%] right-[87.88%] top-[13.07%] bottom-[79.97%]'
    />
    <img 
        src={start2} 
        alt="start 2" 
        className='scale-up-center-hover absolute left-[14.71%] right-[81.95%] top-[56.27%] bottom-[37.69%]'
    />
    <img 
        src={arrow} 
        alt="arrow" 
        className='scale-up-center-hover z-[1] absolute left-[47.83%] right-[44.29%] top-[0.33%] '
    />

    <img 
        src={hat} 
        alt="hat" 
        className='rotate-scale-up-hover z-[1] absolute w-[40.31px] h-[38.58px] lg:w-[58.31px] lg:h-[51.22px] left-[30%] top-[40.33px] '
    />
    <img 
        src={girl} 
        alt="girl" 
        className=' z-[0] absolute w-[50%] h-[50%] lg:w-fit lg:h-fit left-[22.75%] right-[14.99%] top-[9.07%] bottom-[9.07%]'
    />
</div>
  )
}

export default HeaderImage