import React, { useState } from 'react';
import rate1BG from '../assets/blob-haikei.svg';
import rate2 from '../assets/rete2.svg';
import { BiArrowBack } from 'react-icons/bi';
import { collegesColors } from '../../../utils/constants';
import DropDown from './DropDown';

const StepTwo = ({ handlerFunction, animate, backwardsFunction, type }) => {

    const [selectedWord, setSelectedWord] = useState( type === 1 ? 'Select college...' : 'Select code...');

    return (
        <>
            <div className='w-full flex justify-between'>
                <button
                    onClick={backwardsFunction}
                    className='flex items-center bg-white hover:shadow-md hover:shadow-slate-200 transition-all active:border-[color:var(--purple)] justify-center border rounded-md h-10 w-20'
                >
                    <BiArrowBack />
                </button>

                <button
                    onClick={() => {
                        if(selectedWord !== 'Select college...' && selectedWord !== 'Select code...'){
                            handlerFunction(selectedWord);
                        }
                    }}
                    className={
                        'flex items-center bg-white border transition-all justify-center rounded-md h-10 w-20 '
                        + (( selectedWord !== 'Select college...' && selectedWord !== 'Select code...') ? 'hover:shadow-md hover:shadow-slate-200 active:border-[color:var(--purple)]' : ' cursor-not-allowed text-gray-300')
                    }
                >
                    <BiArrowBack className=' rotate-180' />
                </button>
            </div>
            <div className={'h-full flex ' + animate}>

                <div className='hidden w-1/2 relative lg:flex items-center justify-center'>
                    <img
                        src={rate1BG}
                        alt="rate background"
                        className=''
                    />

                    <img
                        src={rate2}
                        alt="rate"
                        className='w-4/5 h-4/5 absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%]'
                    />
                </div>

                <div className='w-full lg:w-1/2'>

                    <div className='my-20 '>
                        <h2 className='text-xl md:text-2xl lg:text-3xl text-center'>
                            {type === 1 ? 'Choose the college of your program' : 'Choose code of your course'}
                        </h2>
                    </div>

                    <DropDown 
                        selectedWord={selectedWord} 
                        setSelectedWord={setSelectedWord} 
                        options={type === 1 ? Object.keys(collegesColors) : Object.values(JSON.parse(localStorage.getItem('codes'))).sort()} 
                    />
                </div>
            </div>
        </>
    )
}

export default StepTwo;