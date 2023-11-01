import React, { useEffect, useState } from 'react';
import rate1 from '../assets/review.svg';
import rate1BG from '../assets/blob-haikei.svg';
import AOS from 'aos';

const StepOne = ({ handlerFunction, animate }) => {

    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, [])


    return (
        <div className={'h-full flex ' + animate}>


            <div className='hidden w-1/2 relative lg:flex items-center justify-center'>
                <img
                    src={rate1BG}
                    alt="rate background"
                    className=''
                />

                <img
                    src={rate1}
                    alt="rate"
                    className='w-4/5 h-4/5 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]'
                />
            </div>

            <div className='w-full lg:w-1/2'>

                <div className='my-20 '>
                    <h2 className='text-xl md:text-2xl lg:text-3xl text-center'>
                        What would you like to rate?
                    </h2>
                </div>

                <div className='w-full mx-auto max-w-2xl flex justify-around flex-wrap gap-14'>
                    <button onClick={() => handlerFunction(1)} className='bg-white hover:shadow-md hover:shadow-slate-200 h-14 w-32 rounded-md border transition-all active:border-[color:var(--purple)]'>
                        Programs
                    </button>
                    <button onClick={() => handlerFunction(2)} className='bg-white hover:shadow-md hover:shadow-slate-200 h-14 w-32 rounded-md border transition-all active:border-[color:var(--purple)]'>
                        Courses
                    </button>
                </div>
            </div>
        </div>

    )
}

export default StepOne;