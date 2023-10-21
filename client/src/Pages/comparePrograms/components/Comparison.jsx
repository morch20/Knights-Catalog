import React from 'react';
import missingDR_SVG from '../assets/missingDR.svg';
import CompareSection from './CompareSection';

const Comparison = ({ data, highlights, name }) => {

    return (
        <>
            {
                (data === undefined)
                ?
                    <div className='w-2/5 h-full flex flex-col items-center justify-between'>

                        <div>
                            <p>
                                We can't compare this program right now.
                                We are only comparing "Degree Requirements" sections for the moment.
                            </p>
                            <div className='w-full flex justify-between my-5'>
                                <span className='w-2/5 h-[1px] bg-gray-300' />
                                <span className='w-2/5 h-[1px] bg-gray-300' />
                            </div>
                        </div>

                        <img 
                            src={missingDR_SVG} 
                            alt="picture"
                            className='w-3/4 h-3/4' 
                        />
                    </div>
                :
                    <div className='w-[45%] h-full '>
                        <h2 className='text-xl'>
                            {name}
                        </h2>
                        <div className='h-3/4 my-4 overflow-y-scroll'>
                            <CompareSection section={data} highlights={highlights} />   
                        </div>
                        <h2 className='text-xl'>
                            {data?.grandTotalCredits}
                        </h2>
                    </div>
            }
        </>
    )
}

export default Comparison;