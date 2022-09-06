import React from 'react';

const Card = ({iconAlt, iconURL, title, text, last}) => {
    return ( 
        <div className='relative mb-16'>
            <div className=' bg-[color:var(--purple)] flex items-center justify-center w-16 h-16 rounded-[50%] absolute top-[-15%] left-[40%]'>
                <img 
                    className=' w-10 h-10 '
                    src={iconURL} 
                    alt={iconAlt}>
                </img>
            </div>

            <div className=' w-[15rem] lg:w-[18rem] h-fit bg-white pt-8 px-6 pb-4 text-center lg:text-left rounded-lg'>
                <h3 className='my-4 text-xl font-medium'>
                    {title}
                </h3>
                <p className='text-[color:var(--text-secondary-light)]'>
                    {text}
                </p>
            </div>

            {!last &&
                <div className='bg-[color:var(--yellow)] w-4 h-10 absolute left-1/2'></div>}
        </div>
     );
}
 
export default Card;