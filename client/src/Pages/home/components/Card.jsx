import React from 'react';

const Card = ({iconAlt, iconURL, title, text, last}) => {
    return ( 
        <div className={last  ? 'relative mb-16 2xl:mb-32 md:mr-0' : 'relative mb-16 2xl:mb-32 md:mr-4'}>
            <div className=' bg-[color:var(--purple)] flex items-center justify-center w-16 h-16 2xl:w-20 2xl:h-20 rounded-[50%] absolute top-[-15%] left-[40%] md:left-[15%]'>
                <img
                    className=' w-10 h-10 '
                    src={iconURL}
                    alt={iconAlt}>
                </img>
            </div>
                <div className=' shadow-md w-[15rem] sm:w-[18rem] md:w-[95%] lg:w-[85%] 2xl:w-[75%] h-fit bg-white pt-8 2xl:pt-12 px-6 2xl:px-8 pb-4 2xl:pb-8 text-center lg:text-left rounded-lg md:!mx-0'>
                    <h3 className='my-4 text-xl 2xl:text-2xl font-medium'>
                        {title}
                    </h3>
                    <p className='text-[color:var(--text-secondary-light)] 2xl:text-xl'>
                        {text}
                    </p>
                </div>
                {!last &&
                    <div className='bg-[color:var(--yellow)] w-4 h-[4rem] md:h-[6rem] lg:h-[12rem] 2xl:h-[15rem] z-[-1] absolute left-1/2 md:left-[104%] 2xl:left-[90%] md:top-[40%] md:rotate-90 lg:top-[20%] 2xl:top-[0%]'></div>
                }
        </div>

     );
}
 
export default Card;