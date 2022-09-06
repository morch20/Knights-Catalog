import React from 'react';

const Card = ({iconAlt, iconURL, title, text, last}) => {
    return ( 
        <div className={last  ? 'relative mb-16 md:mr-0' : 'relative mb-16 md:mr-4'}>
            <div className=' bg-[color:var(--purple)] flex items-center justify-center w-16 h-16 rounded-[50%] absolute top-[-15%] left-[40%] md:left-[15%]'>
                <img
                    className=' w-10 h-10 '
                    src={iconURL}
                    alt={iconAlt}>
                </img>
            </div>
                <div className=' w-[15rem] ssm:w-[18rem] md:w-[95%] lg:w-[85%] h-fit bg-white pt-8 px-6 pb-4 text-center lg:text-left rounded-lg md:!mx-0'>
                    <h3 className='my-4 text-xl font-medium'>
                        {title}
                    </h3>
                    <p className='text-[color:var(--text-secondary-light)]'>
                        {text}
                    </p>
                </div>
                {!last &&
                    <div className='bg-[color:var(--yellow)] w-4 h-[2rem] md:h-[6rem] lg:h-[10rem] z-[-1] absolute left-1/2 md:left-[104%] md:top-[40%] md:rotate-90 lg:top-[20%]'></div>}
        </div>

     );
}
 
export default Card;